import { Inject, Injectable } from "@nestjs/common";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { validate } from "class-validator";
import { CircuitBreaker } from "./common/circuit-breaker/circuit-breaker.service";
import { ParasutLoggerService } from "./common/parasut.logger";
import { ParasutModuleOptions } from "./config/parasut-module.options";
import { ParasutAuthDto } from "./dto/request";
import { AuthResponse } from "./dto/response";
import { PARASUT_MODULE_OPTIONS } from "./parasut.constants";
import { GrantType } from "./parasut.enum";

@Injectable()
export class ParasutHttpClient {
  private readonly axiosInstance: AxiosInstance;
  private accessToken!: string;
  private refreshToken!: string;
  private tokenExpiresAt!: number; // timestamp in milliseconds

  constructor(
    @Inject(PARASUT_MODULE_OPTIONS)
    private readonly options: ParasutModuleOptions,
    private readonly logger: ParasutLoggerService,
    private readonly circuitBreaker: CircuitBreaker
  ) {
    this.logger.setContext(ParasutHttpClient.name);
    logger.debug?.("ParasutHttpClient initialized");

    this.axiosInstance = axios.create({
      baseURL: `https://api.parasut.com/v4/${this.options.credentials.companyId}`,
      timeout: this.options.timeout ?? 20000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      this.logger.debug(
        `Requesting ${config.method?.toUpperCase()} ${config.url}`
      );
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.logger.debug(
          `Response ${response.status} from ${response.config.url}`
        );
        return response;
      },
      (error) => {
        this.logger.error(`Response error from ${error.config?.url}`, error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Authenticates with the Parasut API using password grant type
   * Creates a new access token and refresh token
   * @private
   */
  private async authenticate() {
    try {
      const reqDto = new ParasutAuthDto({
        client_id: this.options.credentials.clientId,
        client_secret: this.options.credentials.clientSecret,
        redirect_uri: this.options.credentials.redirectUri,
        username: this.options.credentials.email,
        password: this.options.credentials.password,
        grant_type: GrantType.PASSWORD,
      });

      const validatedDto = await validate(reqDto);

      if (validatedDto.length > 0) {
        this.logger.error("Validation failed", validatedDto);
        throw new Error("Validation failed");
      }

      const response = await axios.post<AuthResponse>(
        "https://api.parasut.com/oauth/token",
        reqDto
      );

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      this.tokenExpiresAt = Date.now() + (response.data.expires_in - 60) * 1000;
    } catch (err: any) {
      this.logger.error("Authentication failed", err);
      throw new Error("Authentication failed");
    }
  }

  /**
   * Refreshes the access token using the stored refresh token
   * Updates both access token and refresh token with new values
   * @private
   */
  private async refresh(): Promise<boolean> {
    try {
      const reqDto = new ParasutAuthDto({
        client_id: this.options.credentials.clientId,
        client_secret: this.options.credentials.clientSecret,
        redirect_uri: this.options.credentials.redirectUri,
        refresh_token: this.refreshToken,
        grant_type: GrantType.REFRESH_TOKEN,
      });

      const validatedDto = await validate(reqDto);

      if (validatedDto.length > 0) {
        this.logger.error("Validation failed", validatedDto);
        throw new Error("Validation failed");
      }

      const response = await axios.post<AuthResponse>(
        "https://api.parasut.com/oauth/token",
        reqDto
      );

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      this.tokenExpiresAt = Date.now() + (response.data.expires_in - 60) * 1000;

      return true;
    } catch (err: any) {
      this.logger.error("Token refresh failed", err);
      return false;
    }
  }

  /**
   * Ensures the client has a valid access token before making API requests
   * If the token is expired and a refresh token is available, it will refresh the token
   * Otherwise, it will re-authenticate
   * @private
   */
  private async ensureAuthenticated() {
    if (!this.accessToken || Date.now() >= this.tokenExpiresAt) {
      if (this.refreshToken) {
        this.logger.debug("Access token expired, refreshing");
        const result = await this.refresh();

        if (!result) {
          this.logger.error("Token refresh failed, re-authenticating");
          return await this.authenticate();
        }
      }

      this.logger.error("No refresh token available, re-authenticating");
      return await this.authenticate();
    }
  }

  /**
   * Generic method to make API requests with Axios
   * @param method - The HTTP method to use (get, post, put, delete, etc.)
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param data - The request payload (for POST, PUT, etc.)
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  private async makeRequest<ReturnType, Data, Params>(
    method: "get" | "post" | "put" | "patch" | "delete",
    url: string,
    params?: Params,
    data?: Data,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    await this.ensureAuthenticated();

    try {
      return await this.circuitBreaker.execute(async () => {
        this.logger.verbose(
          `Making ${method.toUpperCase()} API call to ${url}`
        );

        const requestConfig: AxiosRequestConfig = {
          method,
          url,
          ...options,
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            ...(options.headers || {}),
          },
        };

        if (
          data !== undefined &&
          ["post", "put", "patch"].includes(method.toLowerCase())
        ) {
          requestConfig.data = data;
        }

        if (params !== undefined) {
          requestConfig.params = params;
        }

        const response = await this.axiosInstance.request(requestConfig);
        return response.data;
      });
    } catch (error) {
      this.logger.error(
        `${method.toUpperCase()} API request failed for ${url}`,
        error
      );
      throw error;
    }
  }

  /**
   * Makes a GET request to the API
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  async get<ReturnType, Params>(
    url: string,
    params?: Params,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    return this.makeRequest<ReturnType, undefined, Params>(
      "get",
      url,
      params,
      undefined,
      options
    );
  }

  /**
   * Makes a POST request to the API
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param data - The request payload
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  async post<ReturnType, Data, Params>(
    url: string,
    params?: Params,
    data?: Data,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    return this.makeRequest<ReturnType, Data, Params>(
      "post",
      url,
      params,
      data,
      options
    );
  }

  /**
   * Makes a PUT request to the API
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param data - The request payload
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  async put<ReturnType, Data, Params>(
    url: string,
    params?: Params,
    data?: Data,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    return this.makeRequest<ReturnType, Data, Params>(
      "put",
      url,
      params,
      data,
      options
    );
  }

  /**
   * Makes a PATCH request to the API
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param data - The request payload
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  async patch<ReturnType, Data, Params>(
    url: string,
    params?: Params,
    data?: Data,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    return this.makeRequest<ReturnType, Data, Params>(
      "patch",
      url,
      params,
      data,
      options
    );
  }

  /**
   * Makes a DELETE request to the API
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  async delete<ReturnType, Params>(
    url: string,
    params?: Params,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    return this.makeRequest<ReturnType, undefined, Params>(
      "delete",
      url,
      params,
      undefined,
      options
    );
  }
}

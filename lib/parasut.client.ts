import { Injectable, Optional } from "@nestjs/common";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { validate } from "class-validator";
import { URLSearchParams } from "url";
import { CircuitBreaker } from "./common/circuit-breaker/circuit-breaker.service";
import { ParasutLoggerService } from "./common/parasut.logger";
import { ParasutConfig } from "./config/parasut.config";
import { ParasutAuthDto } from "./dto/request";
import { AuthResponse } from "./dto/response";
import { GrantType } from "./parasut.enum";

@Injectable()
export class ParasutHttpClient {
  private readonly axiosInstance: AxiosInstance;
  private accessToken!: string;
  private refreshToken!: string;
  private tokenExpiresAt!: number;

  constructor(
    private readonly options: ParasutConfig,
    private readonly logger: ParasutLoggerService,
    @Optional() private readonly circuitBreaker?: CircuitBreaker
  ) {
    this.logger.setContext(ParasutHttpClient.name);
    logger.debug?.("ParasutHttpClient initialized");

    this.axiosInstance = axios.create({
      baseURL: `https://api.parasut.com/v4/${this.options.parasutCompanyId}`,
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
        client_id: this.options.parasutClientId,
        client_secret: this.options.parasutSecret,
        redirect_uri: this.options.redirectUri,
        username: this.options.parasutEmail,
        password: this.options.parasutPassword,
        grant_type: GrantType.PASSWORD,
      });

      const validatedDto = await validate(reqDto);

      if (validatedDto.length > 0) {
        this.logger.error("Validation failed", validatedDto);
        throw new Error("Validation failed");
      }

      let accessToken = "";
      let refreshToken = "";
      let tokenExpiresAt = 0;

      switch (reqDto.grant_type) {
        case GrantType.AUTHORIZATION_CODE: {
          throw new Error("Authorization code grant type is not supported");
        }
        case GrantType.PASSWORD: {
          const params = new URLSearchParams();

          if (!reqDto.username) {
            throw new Error("Username is required");
          }
          if (!reqDto.password) {
            throw new Error("Password is required");
          }

          params.append("client_id", reqDto.client_id);
          params.append("client_secret", reqDto.client_secret);
          params.append("redirect_uri", "urn:ietf:wg:oauth:2.0:oob");
          params.append("username", reqDto.username);
          params.append("password", reqDto.password);
          params.append("grant_type", reqDto.grant_type);

          const response = await axios.post<AuthResponse>(
            "https://api.parasut.com/oauth/token",
            undefined,
            {
              params,
            }
          );

          accessToken = response.data.access_token;
          refreshToken = response.data.refresh_token;
          tokenExpiresAt = Date.now() + (response.data.expires_in - 60) * 1000;
          break;
        }
        default: {
          throw new Error("Invalid grant type");
        }
      }

      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.tokenExpiresAt = tokenExpiresAt;
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
        client_id: this.options.parasutClientId,
        client_secret: this.options.parasutSecret,
        redirect_uri: this.options.redirectUri,
        refresh_token: this.refreshToken,
        grant_type: GrantType.REFRESH_TOKEN,
      });

      const validatedDto = await validate(reqDto);

      if (validatedDto.length > 0) {
        this.logger.error("Validation failed", validatedDto);
        throw new Error("Validation failed");
      }
      const params = new URLSearchParams();

      if (!reqDto.refresh_token) {
        throw new Error("Refresh token is required");
      }
      if (!reqDto.grant_type || reqDto.grant_type !== GrantType.REFRESH_TOKEN) {
        throw new Error("Invalid grant type");
      }

      params.append("client_id", reqDto.client_id);
      params.append("client_secret", reqDto.client_secret);
      params.append("refresh_token", reqDto.refresh_token);
      params.append("grant_type", reqDto.grant_type);

      const response = await axios.post<AuthResponse>(
        "https://api.parasut.com/oauth/token",
        undefined,
        {
          params,
        }
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

    const requestPromise = async () => {
      this.logger.verbose(`Making ${method.toUpperCase()} API call to ${url}`);

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
    };

    try {
      if (this.circuitBreaker) {
        return await this.circuitBreaker.execute(requestPromise);
      }

      return await requestPromise();
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
  async get<ReturnType, Params = unknown>(
    url: string,
    params?: Params,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    try {
      const response = await this.makeRequest<ReturnType, undefined, Params>(
        "get",
        url,
        params,
        undefined,
        options
      );

      return response;
    } catch (err) {
      this.logger.error("GET request failed", err);
      throw err;
    }
  }

  /**
   * Makes a POST request to the API
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param data - The request payload
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  async post<ReturnType, Data = unknown, Params = unknown>(
    url: string,
    params?: Params,
    data?: Data,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    try {
      const response = await this.makeRequest<ReturnType, Data, Params>(
        "post",
        url,
        params,
        data,
        options
      );

      return response;
    } catch (err) {
      this.logger.error("POST request failed", err);
      throw err;
    }
  }

  /**
   * Makes a PUT request to the API
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param data - The request payload
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  async put<ReturnType, Data = unknown, Params = unknown>(
    url: string,
    params?: Params,
    data?: Data,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    try {
      const response = await this.makeRequest<ReturnType, Data, Params>(
        "put",
        url,
        params,
        data,
        options
      );

      return response;
    } catch (err) {
      this.logger.error("PUT request failed", err);
      throw err;
    }
  }

  /**
   * Makes a PATCH request to the API
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param data - The request payload
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  async patch<ReturnType, Data = unknown, Params = unknown>(
    url: string,
    params?: Params,
    data?: Data,
    options: AxiosRequestConfig = {}
  ): Promise<ReturnType> {
    try {
      const response = await this.makeRequest<ReturnType, Data, Params>(
        "patch",
        url,
        params,
        data,
        options
      );

      return response;
    } catch (err) {
      this.logger.error("PATCH request failed", err);
      throw err;
    }
  }

  /**
   * Makes a DELETE request to the API
   * @param url - The API endpoint URL
   * @param params - Query parameters for the request
   * @param options - Additional Axios request configuration
   * @returns Promise with the API response data
   */
  async delete<Params = unknown>(
    url: string,
    params?: Params,
    options: AxiosRequestConfig = {}
  ): Promise<boolean> {
    try {
      await this.makeRequest<undefined, undefined, Params>(
        "delete",
        url,
        params,
        undefined,
        options
      );

      return true;
    } catch (err) {
      this.logger.error("DELETE request failed", err);
      return false;
    }
  }
}

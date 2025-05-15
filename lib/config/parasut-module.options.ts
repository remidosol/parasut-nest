import { LoggerService, ModuleMetadata, Type } from "@nestjs/common";
import { CircuitBreakerOptions } from "../common/circuit-breaker";
import { PerformanceMetricOptions } from "../common/performance-metric";
import { ParasutEnvironment } from "../parasut.enum";

export interface ParasutCredentialOptions {
  /**
   * Client ID for Parasut API
   */
  clientId: string;

  /**
   * Client secret for Parasut API
   */
  clientSecret: string;

  /**
   * Company ID in Parasut
   */
  companyId: string;

  /**
   * Email for Parasut authentication
   */
  email: string;

  /**
   * Password for Parasut authentication
   */
  password: string;

  /**
   * Target environment for Parasut API
   * @example "DEV", "PRODUCTION"
   */
  environment: ParasutEnvironment;

  /**
   * Base URL for Parasut API
   * @default "https://api.parasut.com/v4/"
   */
  baseUrl?: string;

  /**
   * OAuth2.0 Redirect URI for Parasut authentication
   */
  redirectUri: string;
}

export interface ParasutModuleOptions {
  /**
   * Whether to register the module globally
   * @default false
   */
  global?: boolean;

  /**
   * Logger service for logging
   * @default console
   */
  logger?: LoggerService;

  /**
   * Authentication and connection credentials for Parasut API
   */
  credentials: ParasutCredentialOptions;

  /**
   * Performance metrics options
   * @default { maxMetrics: 100, storeMetrics: true, metricsTtl: 3600000 }
   */
  performanceMetricOptions?: PerformanceMetricOptions;

  /**
   * Circuit breaker options
   * @default { failureThreshold: 5, resetTimeout: 30000 }
   */
  circuitBreakerOptions?: CircuitBreakerOptions;

  /**
   * Request timeout in milliseconds
   * @default 30000
   */
  timeout?: number;
}

export interface ParasutOptionsFactory {
  createParasutOptions: () =>
    | Promise<ParasutModuleOptions>
    | ParasutModuleOptions;
}

export interface ParasutModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  /**
   * useExisting?    -> an existing provider/class implementing ParasutOptionsFactory
   * useClass?       -> a class implementing ParasutOptionsFactory
   * useFactory?     -> a factory function returning ParasutModuleOptions
   * inject?         -> an array of providers to inject into your factory
   */
  useExisting?: Type<ParasutOptionsFactory>;
  useClass?: Type<ParasutOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ParasutModuleOptions> | ParasutModuleOptions;
  inject?: any[];
}

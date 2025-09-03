import { DynamicModule, Logger, Module, Provider } from "@nestjs/common";
import { CircuitBreaker } from "./common/circuit-breaker";
import { ParasutLoggerService } from "./common/parasut.logger";
import { PerformanceService } from "./common/performance-metric";
import { ParasutConfig, validateEnvs } from "./config/parasut.config";
import {
  ParasutModuleAsyncOptions,
  ParasutModuleOptions,
} from "./config/parasut-module.options";
import { ParasutHttpClient } from "./parasut.client";
import { PARASUT_MODULE_OPTIONS } from "./parasut.constants";
import { createAsyncProviders } from "./parasut.provider";

@Module({})
export class ParasutCoreModule {
  static forRoot(options: ParasutModuleOptions): DynamicModule {
    const loggerProvider: Provider = {
      provide: ParasutLoggerService,
      useFactory: () => {
        return new ParasutLoggerService(options.logger ?? new Logger());
      },
    };

    let circuitBreakerProvider: Provider<CircuitBreaker> | null = null,
      performanceServiceProvider: Provider<PerformanceService> | null = null;

    if (options.circuitBreakerOptions?.enabled) {
      circuitBreakerProvider = {
        provide: CircuitBreaker,
        useFactory: (
          logger: ParasutLoggerService,
          parasutOptions: ParasutModuleOptions
        ) => {
          return new CircuitBreaker(
            logger,
            parasutOptions.circuitBreakerOptions
          );
        },
        inject: [ParasutLoggerService, PARASUT_MODULE_OPTIONS],
      };
    }

    if (options.performanceMetricOptions?.enabled) {
      performanceServiceProvider = {
        provide: PerformanceService,
        useFactory: (logger: ParasutLoggerService) => {
          return new PerformanceService(
            logger,
            options.performanceMetricOptions
          );
        },
        inject: [ParasutLoggerService],
      };
    }

    const optionsProvider: Provider = {
      provide: PARASUT_MODULE_OPTIONS,
      useValue: options,
    };

    const configProvider: Provider = {
      provide: ParasutConfig,
      useValue: validateEnvs({
        parasutEnv: options.credentials.environment,
        parasutClientId: options.credentials.clientId,
        redirectUri: options.credentials.redirectUri,
        parasutSecret: options.credentials.clientSecret,
        parasutCompanyId: options.credentials.companyId,
        parasutEmail: options.credentials.email,
        parasutPassword: options.credentials.password,
        timeout: options.timeout,
      }),
    };

    const httpClientProvider: Provider = {
      provide: ParasutHttpClient,
      useFactory: (
        config: ParasutConfig,
        logger: ParasutLoggerService,
        circuitBreaker?: CircuitBreaker
      ) => {
        return new ParasutHttpClient(config, logger, circuitBreaker);
      },
      inject: [
        ParasutConfig,
        ParasutLoggerService,
        ...(circuitBreakerProvider ? [CircuitBreaker] : []),
      ],
    };

    return {
      module: ParasutCoreModule,
      providers: [
        optionsProvider,
        configProvider,
        loggerProvider,
        ...(circuitBreakerProvider ? [circuitBreakerProvider] : []),
        ...(performanceServiceProvider ? [performanceServiceProvider] : []),
        httpClientProvider,
      ],
      exports: [
        ParasutHttpClient,
        ParasutLoggerService,
        ParasutConfig,
        ...(circuitBreakerProvider ? [CircuitBreaker] : []),
        ...(performanceServiceProvider ? [PerformanceService] : []),
      ],
      global: true,
    };
  }

  static forRootAsync(options: ParasutModuleAsyncOptions): DynamicModule {
    const asyncProviders = createAsyncProviders(options);

    const loggerProvider: Provider = {
      provide: ParasutLoggerService,
      useFactory: (parasutOptions: ParasutModuleOptions) => {
        return new ParasutLoggerService(parasutOptions.logger ?? new Logger());
      },
      inject: [PARASUT_MODULE_OPTIONS],
    };

    // Create conditional providers that only provide services when enabled
    const circuitBreakerProvider: Provider = {
      provide: CircuitBreaker,
      useFactory: (
        logger: ParasutLoggerService,
        parasutOptions: ParasutModuleOptions
      ) => {
        if (parasutOptions.circuitBreakerOptions?.enabled) {
          return new CircuitBreaker(
            logger,
            parasutOptions.circuitBreakerOptions
          );
        }
        // Return undefined when disabled - this will be handled by ParasutHttpClient
        return undefined;
      },
      inject: [ParasutLoggerService, PARASUT_MODULE_OPTIONS],
    };

    const performanceServiceProvider: Provider = {
      provide: PerformanceService,
      useFactory: (
        logger: ParasutLoggerService,
        parasutOptions: ParasutModuleOptions
      ) => {
        if (parasutOptions.performanceMetricOptions?.enabled) {
          return new PerformanceService(
            logger,
            parasutOptions.performanceMetricOptions
          );
        }
        // Return undefined when disabled
        return undefined;
      },
      inject: [ParasutLoggerService, PARASUT_MODULE_OPTIONS],
    };

    const configProvider: Provider = {
      provide: ParasutConfig,
      useFactory: (parasutOptions: ParasutModuleOptions) => {
        return validateEnvs({
          parasutEnv: parasutOptions.credentials.environment,
          parasutClientId: parasutOptions.credentials.clientId,
          redirectUri: parasutOptions.credentials.redirectUri,
          parasutSecret: parasutOptions.credentials.clientSecret,
          parasutCompanyId: parasutOptions.credentials.companyId,
          parasutEmail: parasutOptions.credentials.email,
          parasutPassword: parasutOptions.credentials.password,
          timeout: parasutOptions.timeout,
        });
      },
      inject: [PARASUT_MODULE_OPTIONS],
    };

    const httpClientProvider: Provider = {
      provide: ParasutHttpClient,
      useFactory: (
        config: ParasutConfig,
        logger: ParasutLoggerService,
        circuitBreaker?: CircuitBreaker
      ) => {
        return new ParasutHttpClient(config, logger, circuitBreaker);
      },
      inject: [ParasutConfig, ParasutLoggerService, CircuitBreaker],
    };

    return {
      module: ParasutCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        loggerProvider,
        circuitBreakerProvider,
        performanceServiceProvider,
        configProvider,
        httpClientProvider,
      ],
      exports: [
        ParasutHttpClient,
        ParasutLoggerService,
        ParasutConfig,
        CircuitBreaker,
        PerformanceService,
      ],
      global: true,
    };
  }
}

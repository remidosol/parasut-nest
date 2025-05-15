import { DynamicModule, Logger, Module, Provider } from "@nestjs/common";
import { CircuitBreaker } from "./common/circuit-breaker";
import { ParasutLoggerService } from "./common/parasut.logger";
import { PerformanceService } from "./common/performance-metric";
import { ParasutConfig } from "./config/parasut.config";
import {
  ParasutModuleAsyncOptions,
  ParasutModuleOptions,
} from "./config/parasut-module.options";
import {
  ParasutBankFeeModule,
  ParasutContactModule,
  ParasutEmployeeModule,
  ParasutFormalizationModule,
  ParasutPurchaseBillModule,
  ParasutSalaryModule,
  ParasutSalesInvoiceModule,
  ParasutSalesOfferModule,
  ParasutTaxModule,
} from "./modules";
import { ParasutHttpClient } from "./parasut.client";
import { PARASUT_MODULE_OPTIONS } from "./parasut.constants";
import { createAsyncProviders } from "./parasut.provider";

@Module({})
export class ParasutModule {
  static forRoot(options: ParasutModuleOptions): DynamicModule {
    const loggerProvider: Provider = {
      provide: ParasutLoggerService,
      useFactory: () => {
        return new ParasutLoggerService(options.logger ?? new Logger());
      },
    };

    const circuitBreakerProvider: Provider = {
      provide: CircuitBreaker,
      useFactory: (
        logger: ParasutLoggerService,
        bexOptions: ParasutModuleOptions
      ) => {
        return new CircuitBreaker(logger, bexOptions.circuitBreakerOptions);
      },
      inject: [ParasutLoggerService, PARASUT_MODULE_OPTIONS],
    };

    const performanceServiceProvider: Provider = {
      provide: PerformanceService,
      useFactory: (logger: ParasutLoggerService) => {
        return new PerformanceService(logger, options.performanceMetricOptions);
      },
      inject: [ParasutLoggerService],
    };

    const optionsProvider: Provider = {
      provide: PARASUT_MODULE_OPTIONS,
      useValue: options,
    };

    const configProvider: Provider = {
      provide: ParasutConfig,
      useValue: new ParasutConfig({
        PARASUT_ENV: options.credentials.environment,
        PARASUT_CLIENT_ID: options.credentials.clientId,
        PARASUT_SECRET: options.credentials.clientSecret,
        PARASUT_COMPANY_ID: options.credentials.companyId,
        PARASUT_EMAIL: options.credentials.email,
        PARASUT_PASSWORD: options.credentials.password,
        timeout: options.timeout,
      }),
    };

    return {
      imports: [
        ParasutContactModule,
        ParasutBankFeeModule,
        ParasutEmployeeModule,
        ParasutPurchaseBillModule,
        ParasutSalaryModule,
        ParasutTaxModule,
        ParasutFormalizationModule,
        ParasutSalesOfferModule,
        ParasutSalesInvoiceModule,
      ],
      module: ParasutModule,
      providers: [
        optionsProvider,
        configProvider,
        loggerProvider,
        circuitBreakerProvider,
        performanceServiceProvider,
        ParasutHttpClient,
      ],
      exports: [],
      global: options.global ?? false,
    };
  }

  static forRootAsync(options: ParasutModuleAsyncOptions): DynamicModule {
    const asyncProviders = createAsyncProviders(options);

    const loggerProvider: Provider = {
      provide: ParasutLoggerService,
      useFactory: (bexOptions: ParasutModuleOptions) => {
        return new ParasutLoggerService(bexOptions.logger ?? new Logger());
      },
      inject: [PARASUT_MODULE_OPTIONS],
    };

    const performanceServiceProvider: Provider = {
      provide: PerformanceService,
      useFactory: (
        logger: ParasutLoggerService,
        bexOptions: ParasutModuleOptions
      ) => {
        return new PerformanceService(
          logger,
          bexOptions.performanceMetricOptions
        );
      },
      inject: [ParasutLoggerService, PARASUT_MODULE_OPTIONS],
    };

    const circuitBreakerProvider: Provider = {
      provide: CircuitBreaker,
      useFactory: (
        logger: ParasutLoggerService,
        bexOptions: ParasutModuleOptions
      ) => {
        return new CircuitBreaker(logger, bexOptions.circuitBreakerOptions);
      },
      inject: [ParasutLoggerService, PARASUT_MODULE_OPTIONS],
    };

    return {
      module: ParasutModule,
      imports: [
        ...(options.imports ?? []),
        ParasutContactModule,
        ParasutBankFeeModule,
        ParasutEmployeeModule,
        ParasutPurchaseBillModule,
        ParasutSalaryModule,
        ParasutTaxModule,
        ParasutFormalizationModule,
        ParasutSalesOfferModule,
        ParasutSalesInvoiceModule,
      ],
      providers: [
        ...asyncProviders,
        loggerProvider,
        circuitBreakerProvider,
        performanceServiceProvider,
        ParasutHttpClient,
      ],
      exports: [],
    };
  }
}

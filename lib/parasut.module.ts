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
  // ParasutContactService,
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

    let circuitBreakerProvider: Provider<CircuitBreaker> | null = null,
      performanceServiceProvider: Provider<PerformanceService> | null = null;

    if (options.circuitBreakerOptions?.enabled) {
      circuitBreakerProvider = {
        provide: CircuitBreaker,
        useFactory: (
          logger: ParasutLoggerService,
          bexOptions: ParasutModuleOptions
        ) => {
          return new CircuitBreaker(logger, bexOptions.circuitBreakerOptions);
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
      useValue: new ParasutConfig({
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

    // const asda = new ParasutContactService();

    // asda.createContact({
    //   data: {
    //     type: "contacts",
    //     attributes: {
    //       name: "John Doe",
    //       contact_type: "person",
    //       account_type: "customer",
    //     },
    //     relationships: {
    //       category: {
    //         data: {
    //           type: "item_categories",
    //           attributes: {}
    //         }
    //       }
    //     }
    //   },
    // });

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
        ...(circuitBreakerProvider ? [circuitBreakerProvider] : []),
        ...(performanceServiceProvider ? [performanceServiceProvider] : []),
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

    const circuitBreakerProvider: Provider<CircuitBreaker | null> = {
      provide: CircuitBreaker,
      useFactory: (
        logger: ParasutLoggerService,
        bexOptions: ParasutModuleOptions
      ) => {
        if (bexOptions.circuitBreakerOptions?.enabled) {
          return new CircuitBreaker(logger, bexOptions.circuitBreakerOptions);
        }

        return null;
      },
      inject: [ParasutLoggerService, PARASUT_MODULE_OPTIONS],
    };

    const performanceServiceProvider: Provider<PerformanceService | null> = {
      provide: PerformanceService,
      useFactory: (
        logger: ParasutLoggerService,
        bexOptions: ParasutModuleOptions
      ) => {
        if (bexOptions.performanceMetricOptions?.enabled) {
          return new PerformanceService(
            logger,
            bexOptions.performanceMetricOptions
          );
        }

        return null;
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

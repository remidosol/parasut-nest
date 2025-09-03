import { Provider, Type } from "@nestjs/common";
import { ParasutLoggerService } from "./common/parasut.logger";
import { ParasutConfig, validateEnvs } from "./config/parasut.config";
import {
  ParasutModuleAsyncOptions,
  ParasutModuleOptions,
  ParasutOptionsFactory,
} from "./config/parasut-module.options";
import { PARASUT_MODULE_OPTIONS } from "./parasut.constants";

/**
 * Create an async options provider based on the module options.
 *
 * @param options The async module options.
 * @returns The options provider.
 */
export const createAsyncOptionsProvider = (
  options: ParasutModuleAsyncOptions
): Provider => {
  if (options.useFactory) {
    const factory = options.useFactory;

    return {
      provide: PARASUT_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await factory(...args);
        const injectedLogger = args[args.length - 1]; // Assuming the last argument is the logger

        if (!config.logger) {
          config.logger = injectedLogger;
        }

        return config;
      },
      inject: [...(options.inject || []), ParasutLoggerService],
    };
  }

  // useExisting or useClass
  const inject = [
    (options.useExisting || options.useClass) as Type<ParasutOptionsFactory>,
    ParasutLoggerService,
  ];

  return {
    provide: PARASUT_MODULE_OPTIONS,
    useFactory: async (
      optionsFactory: ParasutOptionsFactory,
      logger: ParasutLoggerService
    ) => {
      const config = await optionsFactory.createParasutOptions();

      if (!config.logger) {
        config.logger = logger;
      }

      return config;
    },
    inject,
  };
};

/**
 * Helper: create providers that fetch ParasutModuleOptions asynchronously.
 * We handle the various use* patterns (useFactory, useClass, useExisting).
 */
export const createAsyncProviders = (
  options: ParasutModuleAsyncOptions
): Provider[] => {
  if (options.useFactory) {
    return [
      {
        provide: PARASUT_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
      {
        inject: [PARASUT_MODULE_OPTIONS],
        provide: ParasutConfig,
        useFactory: (options: ParasutModuleOptions) => {
          return validateEnvs({
            parasutEnv: options.credentials.environment,
            parasutClientId: options.credentials.clientId,
            redirectUri: options.credentials.redirectUri,
            parasutSecret: options.credentials.clientSecret,
            parasutCompanyId: options.credentials.companyId,
            parasutEmail: options.credentials.email,
            parasutPassword: options.credentials.password,
            timeout: options.timeout,
          });
        },
      },
    ];
  }

  const providers: Provider[] = [];

  // Add options provider (works for both useClass and useExisting)
  providers.push(createAsyncOptionsProvider(options));

  return providers;
};

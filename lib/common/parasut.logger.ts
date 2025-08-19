import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common";

@Injectable()
export class ParasutLoggerService implements NestLoggerService {
  context!: string;

  constructor(private readonly logger: NestLoggerService) {}

  setContext(context: string) {
    this.context = context;
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: [...any, string?]): void;
  log(
    message: string,
    context?: string,
    ...optionalParams: [...any, string?]
  ): void {
    optionalParams = context
      ? optionalParams.concat(context)
      : this.context
        ? optionalParams.concat(this.context)
        : optionalParams;

    this.logger.log(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: [...any, string?, string?]): void;
  error(
    message: string,
    context?: string,
    ...optionalParams: [...any, string?, string?]
  ): void {
    optionalParams = context
      ? optionalParams.concat(context)
      : this.context
        ? optionalParams.concat(this.context)
        : optionalParams;

    this.logger.error(message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: [...any, string?]): void;
  warn(
    message: string,
    context?: string,
    ...optionalParams: [...any, string?, string?]
  ): void {
    optionalParams = context
      ? optionalParams.concat(context)
      : this.context
        ? optionalParams.concat(this.context)
        : optionalParams;

    this.logger.warn(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, context?: string): void;
  debug(message: any, ...optionalParams: [...any, string?]): void;
  debug(
    message: string,
    context?: string,
    ...optionalParams: [...any, string?]
  ): void {
    optionalParams = context
      ? optionalParams.concat(context)
      : this.context
        ? optionalParams.concat(this.context)
        : optionalParams;

    this.logger.debug?.(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  verbose(message: any, context?: string): void;
  verbose(message: any, ...optionalParams: [...any, string?]): void;
  verbose(
    message: string,
    context?: string,
    ...optionalParams: [...any, string?]
  ): void {
    optionalParams = context
      ? optionalParams.concat(context)
      : this.context
        ? optionalParams.concat(this.context)
        : optionalParams;

    this.logger.verbose?.(message, ...optionalParams);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, context?: string): void;
  fatal(message: any, ...optionalParams: [...any, string?]): void;
  fatal(message: any, context?: string, ...optionalParams: [...any, string?]) {
    optionalParams = context
      ? optionalParams.concat(context)
      : this.context
        ? optionalParams.concat(this.context)
        : optionalParams;

    this.logger.fatal?.(message, ...optionalParams);
  }
}

import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../parasut.logger";
import { CircuitState } from "./circuit-breaker.enum";
import { CircuitBreakerOptions } from "./circuit-breaker.interface";

@Injectable()
export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private nextAttempt: number = Date.now();
  private readonly options: CircuitBreakerOptions;

  constructor(
    private readonly logger: ParasutLoggerService,
    options?: CircuitBreakerOptions
  ) {
    logger.setContext(CircuitBreaker.name);

    this.options = {
      failureThreshold: options?.failureThreshold ?? 5,
      resetTimeout: options?.resetTimeout ?? 30000, // 30 seconds
    };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() > this.nextAttempt) {
        this.state = CircuitState.HALF_OPEN;
        this.logger.log("Circuit breaker state changed to HALF_OPEN");
      } else {
        this.logger.warn("Circuit is OPEN, rejecting request");
        throw new Error("Circuit is open, request rejected");
      }
    }

    try {
      const result = await fn();
      this.success();
      return result;
    } catch (error) {
      this.failure();
      throw error;
    }
  }

  private success(): void {
    this.failureCount = 0;
    this.state = CircuitState.CLOSED;
    this.logger.log("Request successful, circuit breaker state: CLOSED");
  }

  private failure(): void {
    this.failureCount += 1;
    if (this.failureCount >= this.options.failureThreshold) {
      this.state = CircuitState.OPEN;
      this.nextAttempt = Date.now() + this.options.resetTimeout;
      this.logger.warn(
        `Circuit breaker state changed to OPEN until ${new Date(this.nextAttempt).toISOString()}`
      );
    }
  }
}

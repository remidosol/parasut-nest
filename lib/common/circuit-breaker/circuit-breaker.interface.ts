export interface CircuitBreakerOptions {
  /**
   * Whether the circuit breaker is enabled.
   * @default false
   */
  enabled?: boolean;
  /**
   * The number of failures before the circuit breaker opens.
   */
  failureThreshold: number;
  /**
   * The time in milliseconds before the circuit breaker attempts to reset.
   */
  resetTimeout: number;
}

export interface PerformanceMetric {
  /**
   * The name of the operation being tracked.
   */
  operation: string;

  /**
   * The timestamp when the operation started.
   */
  startTime: number;

  /**
   * The timestamp when the operation ended. Optional.
   */
  endTime?: number;

  /**
   * The duration of the operation in milliseconds. Optional.
   */
  duration?: number;

  /**
   * Whether the operation was successful.
   */
  success: boolean;

  /**
   * The error message if the operation failed. Optional.
   */
  error?: string;
}

export interface PerformanceMetricOptions {
  /**
   * Whether to enable performance tracking
   * @default false
   */
  enabled?: boolean;

  /**
   * Maximum number of metrics to keep in memory
   * @default 100
   */
  maxMetrics?: number;

  /**
   * Whether to store metrics in memory at all
   * @default true
   */
  storeMetrics?: boolean;

  /**
   * Time in milliseconds after which metrics are automatically purged
   * Setting to 0 disables time-based cleanup
   * @default 3600000 (1 hour)
   */
  metricsTtl?: number;
}

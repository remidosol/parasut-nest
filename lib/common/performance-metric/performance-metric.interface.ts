export interface PerformanceMetric {
  operation: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  success: boolean;
  error?: string;
}

export interface PerformanceMetricOptions {
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

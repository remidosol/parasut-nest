import { ParasutLoggerService } from "../parasut.logger";
import {
  PerformanceMetric,
  PerformanceMetricOptions,
} from "./performance-metric.interface";

export class PerformanceService {
  private metrics: PerformanceMetric[] = [];
  private readonly options: Required<PerformanceMetricOptions>;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(
    private readonly logger: ParasutLoggerService,
    options?: PerformanceMetricOptions
  ) {
    logger.setContext(PerformanceService.name);

    // Set defaults with provided overrides
    this.options = {
      enabled: true,
      maxMetrics: options?.maxMetrics ?? 100,
      storeMetrics: options?.storeMetrics ?? true,
      metricsTtl: options?.metricsTtl ?? 3600000, // Default: 1 hour
    };

    this.cleanupInterval = setInterval(
      () => {
        if (this.options.storeMetrics) {
          this.cleanupOldMetrics();
        }
      },
      Math.min(this.options.metricsTtl, 60000)
    );
  }

  /**
   * Tracks the performance of an asynchronous operation.
   * @template T - The return type of the operation.
   * @param operation - The name of the operation.
   * @param fn - The asynchronous function to execute and track.
   * @returns A promise that resolves with the result of the function.
   * @throws Error if the function throws an error.
   */
  async trackOperation<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const metric: PerformanceMetric = {
      operation,
      startTime: Date.now(),
      success: false,
    };

    try {
      const result = await fn();
      metric.success = true;
      return result;
    } catch (error) {
      metric.error = error.message;
      throw error;
    } finally {
      metric.endTime = Date.now();
      metric.duration = metric.endTime - metric.startTime;

      // Log performance info
      this.logger.log(
        `Operation "${operation}" ${metric.success ? "succeeded" : "failed"} in ${metric.duration}ms`
      );

      // Store metric if enabled
      if (this.options.storeMetrics) {
        this.addMetric(metric);
      }
    }
  }

  /**
   * Adds a performance metric to the in-memory store.
   * Enforces the maximum number of metrics to keep.
   * @param metric - The performance metric to add.
   */
  private addMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Enforce size limit by removing oldest metrics
    if (this.metrics.length > this.options.maxMetrics) {
      this.metrics = this.metrics.slice(-this.options.maxMetrics);
    }
  }

  /**
   * Cleans up old metrics based on the configured TTL.
   * This method is called periodically by an interval timer.
   */
  private cleanupOldMetrics(): void {
    if (!this.options.storeMetrics || this.options.metricsTtl <= 0) {
      return;
    }

    const now = Date.now();
    const cutoff = now - this.options.metricsTtl;

    // Filter out metrics older than the TTL
    const oldLength = this.metrics.length;
    this.metrics = this.metrics.filter((m) => m.startTime >= cutoff);

    const removed = oldLength - this.metrics.length;
    if (removed > 0) {
      this.logger.debug(`Cleaned up ${removed} expired performance metrics`);
    }
  }

  /**
   * Retrieves all stored performance metrics.
   * @returns A copy of the array of performance metrics.
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Retrieves performance metrics for a specific operation.
   * @param operation - The name of the operation to filter by.
   * @returns An array of performance metrics for the specified operation.
   */
  getMetricsByOperation(operation: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.operation === operation);
  }

  /**
   * Retrieves the most recent performance metrics.
   * @param count - The maximum number of recent metrics to retrieve. Defaults to 100.
   * @returns An array of the most recent performance metrics.
   */
  getRecentMetrics(count: number = 100): PerformanceMetric[] {
    return this.metrics.slice(-Math.min(count, this.metrics.length));
  }

  /**
   * Clears all stored performance metrics.
   */
  clearMetrics(): void {
    const count = this.metrics.length;
    this.metrics = [];
    this.logger.debug(`Cleared ${count} performance metrics`);
  }

  /**
   * Lifecycle hook that cleans up resources when the module is destroyed.
   * Clears the interval timer for metric cleanup.
   */
  onModuleDestroy(): void {
    // Clean up the interval when the service is destroyed
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

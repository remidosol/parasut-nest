import { Injectable } from "@nestjs/common";
import { ParasutLoggerService } from "../parasut.logger";
import {
  PerformanceMetric,
  PerformanceMetricOptions,
} from "./performance-metric.interface";

@Injectable()
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

  private addMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric);

    // Enforce size limit by removing oldest metrics
    if (this.metrics.length > this.options.maxMetrics) {
      this.metrics = this.metrics.slice(-this.options.maxMetrics);
    }
  }

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

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getMetricsByOperation(operation: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.operation === operation);
  }

  getRecentMetrics(count: number = 100): PerformanceMetric[] {
    return this.metrics.slice(-Math.min(count, this.metrics.length));
  }

  clearMetrics(): void {
    const count = this.metrics.length;
    this.metrics = [];
    this.logger.debug(`Cleared ${count} performance metrics`);
  }

  onModuleDestroy(): void {
    // Clean up the interval when the service is destroyed
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

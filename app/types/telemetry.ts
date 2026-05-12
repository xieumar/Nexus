export type TelemetrySeverity = 'info' | 'warning' | 'critical' | 'success';

export interface TelemetryPoint {
  timestamp: number;
  value: number;
}

export interface MetricData {
  current: number;
  history: TelemetryPoint[];
  peak: number;
  avg: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface SystemEvent {
  id: string;
  timestamp: number;
  message: string;
  severity: TelemetrySeverity;
  source: string;
}

export interface TelemetryState {
  cpu: MetricData;
  latency: MetricData;
  throughput: MetricData;
  errors: MetricData;
  events: SystemEvent[];
  isStreaming: boolean;
}

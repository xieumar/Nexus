import { defineStore } from 'pinia'
import type { TelemetryState, MetricData, SystemEvent } from '~/types/telemetry'

const INITIAL_METRIC: MetricData = {
  current: 0,
  history: [],
  peak: 0,
  avg: 0,
  trend: 'neutral'
}

const MAX_HISTORY = 8000 // Support full 1h range at 2Hz (7200 points)

export const useTelemetryStore = defineStore('telemetry', () => {
  const state = reactive<TelemetryState>({
    cpu: { ...INITIAL_METRIC },
    latency: { ...INITIAL_METRIC },
    throughput: { ...INITIAL_METRIC },
    errors: { ...INITIAL_METRIC },
    events: [],
    isStreaming: true,
    historyRange: '1m',
    selectedNodeId: null,
    visibleMetrics: ['cpu', 'latency']
  })

  const updateMetric = (key: keyof Omit<TelemetryState, 'events' | 'isStreaming' | 'historyRange' | 'selectedNodeId' | 'visibleMetrics'>, value: number) => {
    const metric = state[key]
    const timestamp = Date.now()

    // Update current value
    const prev = metric.current
    metric.current = value
    
    // Update trend
    if (value > prev) metric.trend = 'up'
    else if (value < prev) metric.trend = 'down'
    else metric.trend = 'neutral'

    // Update peak
    if (value > metric.peak) metric.peak = value

    // Update history
    metric.history.push({ timestamp, value })
    if (metric.history.length > MAX_HISTORY) {
      metric.history.shift()
    }

    // Update average (moving average of the history)
    const sum = metric.history.reduce((acc, p) => acc + p.value, 0)
    metric.avg = Number((sum / metric.history.length).toFixed(2))
  }

  const addEvent = (event: SystemEvent) => {
    state.events.unshift(event)
    if (state.events.length > 50) {
      state.events.pop()
    }
  }

  const setStreaming = (status: boolean) => {
    state.isStreaming = status
  }

  return {
    ...toRefs(state),
    updateMetric,
    addEvent,
    setStreaming
  }
})

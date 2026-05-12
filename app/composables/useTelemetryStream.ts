import { interval, map, takeWhile, tap } from 'rxjs'
import { useTelemetryStore } from '~/stores/telemetry'

export const useTelemetryStream = () => {
  const store = useTelemetryStore()
  let subscription: any = null

  const startStream = () => {
    if (subscription) return

    // Create a stream that emits every 500ms
    subscription = interval(500).pipe(
      // Only emit while streaming is enabled in store
      takeWhile(() => store.isStreaming),
      // Generate mock data for each metric
      map(() => ({
        cpu: 20 + Math.random() * 60, // 20% to 80%
        latency: 10 + Math.random() * 40, // 10ms to 50ms
        throughput: 0.5 + Math.random() * 2.5, // 0.5 to 3.0 GB/s
        errors: Math.random() > 0.95 ? Math.floor(Math.random() * 5) : 0 // Occasional errors
      })),
      // Update the store
      tap((data) => {
        store.updateMetric('cpu', Number(data.cpu.toFixed(1)))
        store.updateMetric('latency', Math.floor(data.latency))
        store.updateMetric('throughput', Number(data.throughput.toFixed(2)))
        store.updateMetric('errors', data.errors)

        // Randomly generate events
        if (data.errors > 0) {
          store.addEvent({
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
            message: `Detected ${data.errors} abnormal system error(s) in Node-7`,
            severity: 'critical',
            source: 'Node-7'
          })
        } else if (Math.random() > 0.8) {
          store.addEvent({
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
            message: 'Metric baseline stabilized',
            severity: 'success',
            source: 'System'
          })
        }
      })
    ).subscribe()
  }

  const stopStream = () => {
    if (subscription) {
      subscription.unsubscribe()
      subscription = null
    }
  }

  return {
    startStream,
    stopStream
  }
}

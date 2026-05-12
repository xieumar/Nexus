import { 
  interval, 
  map, 
  tap, 
  catchError, 
  retry, 
  throwError,
} from 'rxjs'
import { useTelemetryStore } from '~/stores/telemetry'

export const useTelemetryStream = () => {
  const store = useTelemetryStore()
  let subscription: any = null

  // Watch for changes in isStreaming to automatically start/stop
  watch(() => store.isStreaming, (isStreaming) => {
    if (isStreaming) {
      startStream()
    } else {
      stopStream()
    }
  })

  const startStream = () => {
    if (subscription) return

    // Data Simulator 2.1: Balanced 2Hz stream (500ms)
    subscription = interval(500).pipe(
      // Generate mock data
      map((tick) => {
        // Simulate a connection drop occasionally (every 200 ticks ~ 100s)
        if (tick > 0 && tick % 200 === 0) {
          throw new Error('Signal lost')
        }

        return {
          cpu: 25 + Math.sin(tick / 15) * 20 + Math.random() * 30,
          latency: 12 + Math.random() * 28,
          throughput: 1.5 + Math.cos(tick / 40) * 1.2 + Math.random() * 1,
          errors: Math.random() > 0.97 ? Math.floor(Math.random() * 3) + 1 : 0
        }
      }),

      // Update store state
      tap((data) => {
        store.updateMetric('cpu', Number(data.cpu.toFixed(1)))
        store.updateMetric('latency', Math.floor(data.latency))
        store.updateMetric('throughput', Number(data.throughput.toFixed(2)))
        store.updateMetric('errors', data.errors)

        // Robust Event Generation
        if (data.errors > 0) {
          const sources = ['Node-7', 'Storage-Core', 'Edge-Alpha', 'Gateway-1']
          const msgs = [
            'Packet loss detected in ingress buffer',
            'I/O timeout during block write',
            'Unexpected termination of secondary process',
            'Baseline latency exceeded threshold'
          ]
          
          store.addEvent({
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
            message: msgs[Math.floor(Math.random() * msgs.length)] || 'Unknown error',
            severity: data.errors > 2 ? 'critical' : 'warning',
            source: sources[Math.floor(Math.random() * sources.length)] || 'System'
          })
        } else if (Math.random() > 0.98) {
          store.addEvent({
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
            message: 'System state optimized: GC completed',
            severity: 'success',
            source: 'Runtime'
          })
        }
      }),

      // Error handling & recovery
      catchError((err) => {
        console.error('Stream Error:', err.message)
        store.addEvent({
          id: 'err-' + Date.now(),
          timestamp: Date.now(),
          message: `Connection lost: ${err.message}. Retrying...`,
          severity: 'critical',
          source: 'Streamer'
        })
        return throwError(() => err)
      }),
      
      // Automatic retry
      retry({
        count: 10,
        delay: 3000
      })
    ).subscribe({
      error: (err) => {
        console.error('Stream permanently failed:', err)
        store.isStreaming = false
      }
    })
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

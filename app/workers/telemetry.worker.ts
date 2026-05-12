// app/workers/telemetry.worker.ts
import { interval, map, tap, catchError, retry, throwError } from 'rxjs'

// We simulate the same logic as before but inside a worker
let subscription: any = null

self.onmessage = (e) => {
  const { command } = e.data

  if (command === 'start') {
    if (subscription) return
    
    subscription = interval(500).pipe(
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
      catchError((err) => {
        self.postMessage({ type: 'error', message: err.message })
        return throwError(() => err)
      }),
      retry({
        count: 10,
        delay: 3000
      })
    ).subscribe({
      next: (data) => {
        self.postMessage({ type: 'data', data })
      },
      error: (err) => {
        self.postMessage({ type: 'fatal', message: err.message })
      }
    })
  }

  if (command === 'stop') {
    if (subscription) {
      subscription.unsubscribe()
      subscription = null
    }
  }
}

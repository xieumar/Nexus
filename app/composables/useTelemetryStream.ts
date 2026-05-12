import { useTelemetryStore } from '~/stores/telemetry'

export const useTelemetryStream = () => {
  const store = useTelemetryStore()
  let worker: Worker | null = null

  const initWorker = () => {
    if (import.meta.server) return
    
    // Initialize Web Worker
    worker = new Worker(new URL('../workers/telemetry.worker.ts', import.meta.url), {
      type: 'module'
    })

    worker.onmessage = (e) => {
      const { type, data, message } = e.data

      if (type === 'data') {
        store.updateMetric('cpu', Number(data.cpu.toFixed(1)))
        store.updateMetric('latency', Math.floor(data.latency))
        store.updateMetric('throughput', Number(data.throughput.toFixed(2)))
        store.updateMetric('errors', data.errors)

        // Event Generation (Main thread still handles events for now as it's UI bound)
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
        }
      }

      if (type === 'error') {
        store.addEvent({
          id: 'err-' + Date.now(),
          timestamp: Date.now(),
          message: `Connection unstable: ${message}. Attempting recovery...`,
          severity: 'critical',
          source: 'Streamer'
        })
      }

      if (type === 'fatal') {
        console.error('Worker fatal error:', message)
        store.isStreaming = false
      }
    }
  }

  // Watch for changes in isStreaming to automatically start/stop
  // immediate: true handles the initial start when the dashboard mounts
  watch(() => store.isStreaming, (isStreaming) => {
    if (isStreaming) {
      if (!worker) initWorker()
      worker?.postMessage({ command: 'start' })
    } else {
      worker?.postMessage({ command: 'stop' })
    }
  }, { immediate: true })

  const startStream = () => {
    store.isStreaming = true
  }

  const stopStream = () => {
    store.isStreaming = false
  }

  onUnmounted(() => {
    stopStream()
    worker?.terminate()
    worker = null
  })

  return {
    startStream,
    stopStream
  }
}

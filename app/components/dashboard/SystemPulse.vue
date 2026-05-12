<script setup lang="ts">
import { useTelemetryStore } from '~/stores/telemetry'
import NexusChart from './NexusChart.vue'

const telemetry = useTelemetryStore()

const chartOption = computed(() => {
  const cpuData = telemetry.cpu.history.map(p => p.value)
  const latencyData = telemetry.latency.history.map(p => p.value)
  const timestamps = telemetry.cpu.history.map(p => {
    return new Date(p.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' })
  })

  return {
    backgroundColor: 'transparent',
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderWidth: 0,
      textStyle: { color: '#64748b', fontSize: 11, fontWeight: 'bold' },
      padding: [10, 15],
      extraCssText: 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); border-radius: 12px;',
      axisPointer: {
        lineStyle: { color: '#e2e8f0', width: 2 }
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timestamps,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold' }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold' }
    },
    series: [
      {
        name: 'CPU Load',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 3, color: '#06b6d4' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(6, 182, 212, 0.2)' },
              { offset: 1, color: 'rgba(6, 182, 212, 0)' }
            ]
          }
        },
        data: cpuData
      },
      {
        name: 'Latency',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 3, color: '#f59e0b' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(245, 158, 11, 0.15)' },
              { offset: 1, color: 'rgba(245, 158, 11, 0)' }
            ]
          }
        },
        data: latencyData
      }
    ]
  }
})
</script>

<template>
  <div class="h-full w-full">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <div class="h-2 w-2 rounded-full bg-cyan-500"></div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">CPU Load (%)</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="h-2 w-2 rounded-full bg-amber-500"></div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Latency (ms)</span>
        </div>
      </div>
      <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
        <div class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <span class="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Live Streaming</span>
      </div>
    </div>
    
    <div class="h-[340px] w-full">
      <NexusChart :option="chartOption" />
    </div>
  </div>
</template>

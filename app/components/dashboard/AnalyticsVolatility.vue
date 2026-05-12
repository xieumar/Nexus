<script setup lang="ts">
import NexusChart from './NexusChart.vue'

const chartOption = computed(() => {
  // Mock OHLC data for CPU load over 30 intervals
  // [Open, Close, Low, High]
  const data = Array.from({ length: 30 }, (_, i) => {
    const base = 40 + Math.random() * 20
    const open = base + (Math.random() * 10 - 5)
    const close = base + (Math.random() * 10 - 5)
    const low = Math.min(open, close) - Math.random() * 5
    const high = Math.max(open, close) + Math.random() * 5
    return [open, close, low, high]
  })

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      textStyle: { color: '#fff' }
    },
    grid: { left: '10%', right: '10%', bottom: '15%', top: '10%' },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 30 }, (_, i) => `${i}m ago`),
      axisLabel: { color: '#94a3b8', fontSize: 9 },
      axisLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.1)' } }
    },
    yAxis: {
      scale: true,
      splitLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.05)' } },
      axisLabel: { color: '#94a3b8' }
    },
    series: [
      {
        type: 'candlestick',
        data: data,
        itemStyle: {
          color: '#06b6d4',
          color0: '#f43f5e',
          borderColor: '#06b6d4',
          borderColor0: '#f43f5e'
        }
      }
    ]
  }
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex items-center justify-between mb-4 shrink-0">
      <h3 class="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">CPU Volatility (OHLC)</h3>
    </div>
    <div class="flex-1 min-h-0">
      <NexusChart :option="chartOption" />
    </div>
  </div>
</template>

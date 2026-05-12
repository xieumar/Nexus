<script setup lang="ts">
import NexusChart from './NexusChart.vue'

const chartOption = computed(() => {
  const regions = [
    { name: 'North America', value: 85, color: '#06b6d4' },
    { name: 'Europe', value: 72, color: '#8b5cf6' },
    { name: 'Asia Pacific', value: 64, color: '#10b981' },
    { name: 'South America', value: 32, color: '#f59e0b' },
    { name: 'Africa', value: 18, color: '#f43f5e' },
  ]

  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    polar: { radius: [20, '80%'] },
    angleAxis: {
      type: 'category',
      data: regions.map(r => r.name),
      axisLabel: { color: '#94a3b8', fontSize: 10 }
    },
    radiusAxis: {
      max: 100,
      axisLabel: { show: false },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.1)' } }
    },
    series: [{
      type: 'bar',
      data: regions.map(r => ({
        value: r.value,
        itemStyle: { color: r.color }
      })),
      coordinateSystem: 'polar',
      label: { show: true, position: 'middle', formatter: '{c}%', color: '#fff', fontSize: 10 }
    }]
  }
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex items-center justify-between mb-4 shrink-0">
      <h3 class="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Global Traffic Distribution</h3>
    </div>
    <div class="flex-1 min-h-0">
      <NexusChart :option="chartOption" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NexusChart from './NexusChart.vue'

const chartOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item' },
    radar: {
      indicator: [
        { name: 'Compute', max: 100 },
        { name: 'Memory', max: 100 },
        { name: 'Storage', max: 100 },
        { name: 'Latency', max: 100 },
        { name: 'Security', max: 100 }
      ],
      axisName: { color: '#94a3b8', fontSize: 10 },
      splitArea: { show: false },
      splitLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.1)' } },
      axisLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.1)' } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [85, 70, 90, 95, 80],
          name: 'Primary Cluster',
          itemStyle: { color: '#06b6d4' },
          areaStyle: { color: 'rgba(6, 182, 212, 0.2)' }
        },
        {
          value: [60, 40, 50, 70, 90],
          name: 'Edge Nodes',
          itemStyle: { color: '#8b5cf6' },
          areaStyle: { color: 'rgba(139, 92, 246, 0.2)' }
        }
      ]
    }]
  }
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex items-center justify-between mb-4 shrink-0">
      <h3 class="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Multi-Cluster Health Radar</h3>
    </div>
    <div class="flex-1 min-h-0">
      <NexusChart :option="chartOption" />
    </div>
  </div>
</template>

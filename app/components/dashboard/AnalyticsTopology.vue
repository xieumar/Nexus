<script setup lang="ts">
import NexusChart from './NexusChart.vue'

const chartOption = computed(() => {
  const nodes = [
    { name: 'Nexus-Core', symbolSize: 50, itemStyle: { color: '#06b6d4' } },
    { name: 'Edge-Alpha', symbolSize: 30, itemStyle: { color: '#8b5cf6' } },
    { name: 'Edge-Beta', symbolSize: 30, itemStyle: { color: '#8b5cf6' } },
    { name: 'Storage-1', symbolSize: 40, itemStyle: { color: '#f59e0b' } },
    { name: 'Gateway-A', symbolSize: 20, itemStyle: { color: '#10b981' } },
    { name: 'Gateway-B', symbolSize: 20, itemStyle: { color: '#10b981' } },
  ]

  const links = [
    { source: 'Nexus-Core', target: 'Edge-Alpha' },
    { source: 'Nexus-Core', target: 'Edge-Beta' },
    { source: 'Nexus-Core', target: 'Storage-1' },
    { source: 'Edge-Alpha', target: 'Gateway-A' },
    { source: 'Edge-Beta', target: 'Gateway-B' },
  ]

  return {
    backgroundColor: 'transparent',
    tooltip: {},
    series: [{
      type: 'graph',
      layout: 'force',
      data: nodes,
      links: links,
      roam: true,
      label: {
        show: true,
        position: 'right',
        color: '#94a3b8',
        fontSize: 10
      },
      force: {
        repulsion: 1000,
        edgeLength: [50, 150]
      },
      lineStyle: {
        color: 'rgba(148, 163, 184, 0.2)',
        width: 2,
        curveness: 0.3
      }
    }]
  }
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex items-center justify-between mb-4 shrink-0">
      <h3 class="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest">Network Topology Graph</h3>
    </div>
    <div class="flex-1 min-h-0">
      <NexusChart :option="chartOption" />
    </div>
  </div>
</template>

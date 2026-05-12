<script setup lang="ts">
import { useTelemetryStore } from '~/stores/telemetry'
import { cn } from '~/lib/utils'

const telemetry = useTelemetryStore()

// Mock nodes for the heatmap
const nodes = Array.from({ length: 48 }, (_, i) => ({
  id: `N-${String(i + 1).padStart(2, '0')}`,
  load: Math.random() * 100,
  status: Math.random() > 0.95 ? 'error' : Math.random() > 0.8 ? 'warning' : 'healthy'
}))

const getStatusColor = (node: typeof nodes[0]) => {
  const load = node.load
  if (load > 90) return 'bg-[#003d4d] shadow-[0_0_8px_rgba(0,61,77,0.3)]'
  if (load > 75) return 'bg-[#003d4d]/80'
  if (load > 60) return 'bg-[#003d4d]/60'
  if (load > 45) return 'bg-[#003d4d]/40'
  if (load > 30) return 'bg-[#003d4d]/25'
  if (load > 15) return 'bg-[#003d4d]/15'
  return 'bg-slate-100 dark:bg-white/5'
}
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex items-center justify-between mb-6 shrink-0">
      <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Cluster Health Heatmap</h3>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1">
          <div class="h-2 w-2 rounded-full bg-slate-200 dark:bg-white/10"></div>
          <span class="text-[9px] font-bold text-slate-400 uppercase">Idle</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="h-2 w-2 rounded-full bg-[#003d4d]"></div>
          <span class="text-[9px] font-bold text-slate-400 uppercase">Peak Load</span>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-8 sm:grid-cols-12 gap-2 flex-1">
      <div 
        v-for="node in nodes" 
        :key="node.id"
        @click="telemetry.selectedNodeId = node.id"
        :class="cn(
          'aspect-square rounded-sm transition-all duration-500 cursor-pointer hover:scale-110 active:scale-95',
          getStatusColor(node),
          telemetry.selectedNodeId === node.id ? 'ring-2 ring-white dark:ring-cyan-400 ring-offset-2 ring-offset-white dark:ring-offset-[#002d39] z-10' : ''
        )"
        :title="`${node.id}: ${node.load.toFixed(1)}% Load`"
      ></div>
    </div>
    
    <div class="mt-4 pt-4 border-t border-slate-50 dark:border-white/5 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
      <span>Total Nodes: 48</span>
      <span>Uptime: 99.99%</span>
    </div>
  </div>
</template>

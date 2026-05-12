<script setup lang="ts">
import { 
  Database, 
  Server, 
  Cpu, 
  Network, 
  HardDrive,
  RefreshCw,
  MoreVertical,
  Activity
} from 'lucide-vue-next'
import { useTelemetryStore } from '~/stores/telemetry'

definePageMeta({
  layout: 'dashboard'
})

const telemetry = useTelemetryStore()

const nodes = [
  { id: 'node-01', name: 'Nexus Primary', status: 'Healthy', cpu: '42%', ram: '12.4GB', net: '1.2GB/s' },
  { id: 'node-02', name: 'Edge Node Alpha', status: 'Healthy', cpu: '18%', ram: '4.2GB', net: '450MB/s' },
  { id: 'node-03', name: 'Edge Node Beta', status: 'Warning', cpu: '88%', ram: '14.8GB', net: '2.1GB/s' },
  { id: 'node-04', name: 'Storage Core', status: 'Healthy', cpu: '12%', ram: '64.1GB', net: '8.4GB/s' },
]
</script>

<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Telemetry Nodes</h1>
        <p class="text-slate-500 dark:text-white/40 text-sm font-medium">Monitor and manage distributed telemetry processing nodes.</p>
      </div>
      <button class="p-3 rounded-2xl bg-white dark:bg-[#002d39] border border-slate-100 dark:border-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
        <RefreshCw :size="20" />
      </button>
    </div>

    <!-- Node Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="node in nodes" 
        :key="node.id"
        class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-6 shadow-sm group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all duration-300"
      >
        <div class="flex items-start justify-between mb-8">
          <div class="flex gap-4">
            <div :class="[
              'h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300',
              node.status === 'Healthy' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-500'
            ]">
              <Server :size="24" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ node.name }}</h3>
              <div class="flex items-center gap-1.5 mt-0.5">
                <div :class="['h-1.5 w-1.5 rounded-full', node.status === 'Healthy' ? 'bg-emerald-500' : 'bg-amber-500']"></div>
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ node.id }} • {{ node.status }}</span>
              </div>
            </div>
          </div>
          <button class="text-slate-300 dark:text-white/10 hover:text-slate-600 dark:hover:text-white transition-colors">
            <MoreVertical :size="20" />
          </button>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-2">
            <div class="flex items-center gap-2 text-slate-400 dark:text-white/20">
              <Cpu :size="14" />
              <span class="text-[9px] font-bold uppercase tracking-wider">CPU</span>
            </div>
            <p class="text-sm font-bold text-slate-800 dark:text-white">{{ node.cpu }}</p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-2">
            <div class="flex items-center gap-2 text-slate-400 dark:text-white/20">
              <HardDrive :size="14" />
              <span class="text-[9px] font-bold uppercase tracking-wider">RAM</span>
            </div>
            <p class="text-sm font-bold text-slate-800 dark:text-white">{{ node.ram }}</p>
          </div>
          <div class="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-2">
            <div class="flex items-center gap-2 text-slate-400 dark:text-white/20">
              <Network :size="14" />
              <span class="text-[9px] font-bold uppercase tracking-wider">Net</span>
            </div>
            <p class="text-sm font-bold text-slate-800 dark:text-white">{{ node.net }}</p>
          </div>
        </div>

        <!-- Mini Chart Placeholder -->
        <div class="mt-6 pt-6 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Activity :size="14" class="text-cyan-500" />
            <span class="text-xs font-medium text-slate-500 dark:text-white/40">Uptime: 14d 2h 44m</span>
          </div>
          <div class="flex -space-x-2">
            <div v-for="i in 3" :key="i" class="h-6 w-6 rounded-full border-2 border-white dark:border-[#002d39] bg-slate-200 dark:bg-white/10"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

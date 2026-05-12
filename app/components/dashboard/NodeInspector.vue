<script setup lang="ts">
import { 
  X, 
  Activity, 
  Shield, 
  Cpu, 
  HardDrive, 
  Network,
  Clock,
  Terminal,
  Globe
} from 'lucide-vue-next'
import { useTelemetryStore } from '~/stores/telemetry'

const telemetry = useTelemetryStore()

const close = () => {
  telemetry.selectedNodeId = null
}

// Mock node details
const nodeDetails = computed(() => {
  if (!telemetry.selectedNodeId) return null
  return {
    id: telemetry.selectedNodeId,
    region: 'North America (East)',
    ip: '192.168.1.44',
    uptime: '14 days, 2 hours',
    os: 'NexusOS 4.2.1-lts',
    load: Math.random() * 100,
    metrics: [
      { name: 'CPU Usage', value: '42.1%', icon: Cpu, color: 'text-cyan-500' },
      { name: 'Memory', value: '12.4 / 32 GB', icon: HardDrive, color: 'text-blue-500' },
      { name: 'Network In', value: '1.2 GB/s', icon: Network, color: 'text-emerald-500' },
    ]
  }
})
</script>

<template>
  <Transition
    enter-active-class="transform transition ease-in-out duration-500"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition ease-in-out duration-500"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div 
      v-if="telemetry.selectedNodeId"
      class="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-[#002d39] shadow-2xl border-l border-slate-100 dark:border-white/5 z-50 flex flex-col"
    >
      <!-- Header -->
      <div class="h-20 flex items-center justify-between px-8 border-b border-slate-50 dark:border-white/5">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Activity :size="20" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Node Inspector</h3>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ telemetry.selectedNodeId }}</p>
          </div>
        </div>
        <button 
          @click="close"
          class="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 transition-colors"
        >
          <X :size="20" />
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-8 space-y-8">
        <!-- Status Overview -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Health Status</h4>
            <span class="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">Optimal</span>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <p class="text-[10px] font-bold text-slate-400 uppercase mb-1">Region</p>
              <p class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe :size="14" class="text-blue-500" />
                US-East-1
              </p>
            </div>
            <div class="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <p class="text-[10px] font-bold text-slate-400 uppercase mb-1">Uptime</p>
              <p class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock :size="14" class="text-amber-500" />
                14d 2h
              </p>
            </div>
          </div>
        </div>

        <!-- Real-time Metrics -->
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Metrics</h4>
          <div class="space-y-3">
            <div v-for="m in nodeDetails?.metrics" :key="m.name" class="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#00252e] border border-slate-100 dark:border-white/5">
              <div class="flex items-center gap-3">
                <component :is="m.icon" :size="18" :class="m.color" />
                <span class="text-xs font-bold text-slate-600 dark:text-white/60">{{ m.name }}</span>
              </div>
              <span class="text-sm font-bold text-slate-900 dark:text-white font-mono">{{ m.value }}</span>
            </div>
          </div>
        </div>

        <!-- Mini Logs -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Node Events</h4>
            <Terminal :size="14" class="text-slate-300" />
          </div>
          <div class="rounded-2xl bg-slate-900 p-4 font-mono text-[11px] text-slate-300 space-y-2 overflow-hidden">
             <p><span class="text-emerald-500">[19:42:01]</span> SSH connection accepted from 10.0.0.1</p>
             <p><span class="text-blue-500">[19:42:05]</span> Service 'nexus-api' restart triggered</p>
             <p><span class="text-emerald-500">[19:42:10]</span> Baseline check: PASS (12ms latency)</p>
             <p><span class="text-amber-500">[19:43:00]</span> Minor I/O wait detected (0.2s)</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="p-8 border-t border-slate-50 dark:border-white/5 space-y-3">
        <button class="w-full py-4 rounded-2xl bg-[#003d4d] text-white font-bold text-xs hover:bg-[#002d39] transition-all shadow-lg shadow-[#003d4d]/20">
          Open Full System Terminal
        </button>
        <button class="w-full py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 font-bold text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
          Reboot Node Instances
        </button>
      </div>
    </div>
  </Transition>
</template>

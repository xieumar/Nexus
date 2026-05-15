<script setup lang="ts">
import { 
  Terminal, 
  Search, 
  Filter, 
  Download, 
  Trash2,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-vue-next'
import { useTelemetryStore } from '~/stores/telemetry'

definePageMeta({
  layout: 'dashboard'
})

const telemetry = useTelemetryStore()
const searchQuery = ref('')
const selectedSeverity = ref('all')

const filteredEvents = computed(() => {
  return telemetry.events.filter(e => {
    const matchesSearch = e.message.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          e.source.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSeverity = selectedSeverity.value === 'all' || e.severity === selectedSeverity.value
    return matchesSearch && matchesSeverity
  })
})

const severities = [
  { id: 'all', name: 'All Events' },
  { id: 'critical', name: 'Critical' },
  { id: 'warning', name: 'Warning' },
  { id: 'success', name: 'Success' },
]
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-4 md:px-0">
      <div class="flex flex-col gap-1 text-center lg:text-left">
        <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">System Logs</h1>
        <p class="text-slate-500 dark:text-white/40 text-sm font-medium">Real-time audit trail and event stream.</p>
      </div>
      <div class="flex items-center justify-center lg:justify-end gap-3">
        <button class="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#002d39] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-white/60 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
          <Download :size="16" />
          <span class="hidden sm:inline">Export CSV</span>
          <span class="sm:hidden">Export</span>
        </button>
        <button class="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all">
          <Trash2 :size="16" />
          <span class="hidden sm:inline">Clear Logs</span>
          <span class="sm:hidden">Clear</span>
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-0">
      <div class="md:col-span-2 relative">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Filter events..." 
          class="w-full pl-12 pr-4 h-12 rounded-2xl bg-white dark:bg-[#002d39] border border-slate-200 dark:border-white/5 outline-none focus:ring-2 focus:ring-cyan-500/20 text-slate-700 dark:text-white/80 text-sm"
        />
      </div>
      <div class="relative">
        <Filter class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
        <select 
          v-model="selectedSeverity"
          class="w-full pl-12 pr-4 h-12 rounded-2xl bg-white dark:bg-[#002d39] border border-slate-200 dark:border-white/5 outline-none focus:ring-2 focus:ring-cyan-500/20 text-slate-700 dark:text-white/80 text-sm appearance-none"
        >
          <option v-for="s in severities" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </div>
    </div>

    <!-- Logs Table -->
    <div class="px-4 md:px-0">
      <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 overflow-hidden">
        <div class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-left min-w-[600px]">
            <thead>
              <tr class="border-b border-slate-50 dark:border-white/5">
                <th class="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                <th class="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Severity</th>
                <th class="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Source</th>
                <th class="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50 dark:divide-white/5">
              <tr v-for="event in filteredEvents" :key="event.id" class="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-500 dark:text-white/30 font-mono">
                  {{ new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    'inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase',
                    event.severity === 'critical' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' :
                    event.severity === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  ]">
                    <AlertCircle v-if="event.severity === 'critical'" :size="12" />
                    <CheckCircle2 v-else-if="event.severity === 'success'" :size="12" />
                    <Info v-else :size="12" />
                    {{ event.severity }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-700 dark:text-white/70">
                  {{ event.source }}
                </td>
                <td class="px-6 py-4 text-xs text-slate-600 dark:text-white/50 max-w-[300px] truncate">
                  {{ event.message }}
                </td>
              </tr>
              <tr v-if="filteredEvents.length === 0">
                <td colspan="4" class="px-6 py-20 text-center">
                  <div class="flex flex-col items-center gap-3 opacity-30">
                    <Terminal :size="48" />
                    <p class="text-sm font-bold">No logs matching your criteria</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

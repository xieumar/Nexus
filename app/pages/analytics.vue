<script setup lang="ts">
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Clock,
  ArrowUpRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-vue-next'
import { useTelemetryStore } from '~/stores/telemetry'

definePageMeta({
  layout: 'dashboard'
})

const telemetry = useTelemetryStore()

const metrics = [
  { name: 'Avg. Response Time', value: '24ms', change: '-12%', icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { name: 'Active Sessions', value: '1,284', change: '+18%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Error Rate', value: '0.02%', change: '-0.1%', icon: Activity, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { name: 'Throughput', value: '4.2 GB/s', change: '+5%', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
]
</script>

<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">System Analytics</h1>
      <p class="text-slate-500 dark:text-white/40 text-sm font-medium">Deep dive into your system performance and user metrics.</p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="metric in metrics" 
        :key="metric.name"
        class="bg-white dark:bg-[#002d39] p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm"
      >
        <div class="flex items-center justify-between mb-4">
          <div :class="['p-3 rounded-2xl', metric.bg, metric.color]">
            <component :is="metric.icon" :size="20" />
          </div>
          <div class="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
            {{ metric.change }}
          </div>
        </div>
        <p class="text-slate-400 dark:text-white/20 text-[10px] font-bold uppercase tracking-[0.1em] mb-1">{{ metric.name }}</p>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ metric.value }}</h3>
      </div>
    </div>

    <!-- Placeholder for Advanced Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 h-[400px] flex flex-col items-center justify-center text-center space-y-4">
        <div class="p-4 rounded-full bg-slate-50 dark:bg-white/5">
          <BarChart3 :size="48" class="text-slate-300 dark:text-white/20" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Resource Allocation</h3>
          <p class="text-sm text-slate-500 dark:text-white/40 max-w-xs mx-auto">Historical data visualization for node-level resource scheduling.</p>
        </div>
        <button class="px-6 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">Generate Report</button>
      </div>

      <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 h-[400px] flex flex-col items-center justify-center text-center space-y-4">
        <div class="p-4 rounded-full bg-slate-50 dark:bg-white/5">
          <PieChartIcon :size="48" class="text-slate-300 dark:text-white/20" />
        </div>
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Traffic Distribution</h3>
          <p class="text-sm text-slate-500 dark:text-white/40 max-w-xs mx-auto">Regional traffic analysis across edge locations.</p>
        </div>
        <button class="px-6 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60 text-xs font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">View Map</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  TrendingUp, 
  Users, 
  Zap, 
  Clock,
  ArrowUpRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Calendar,
  Network as NetworkIcon,
  Globe,
  Flame
} from 'lucide-vue-next'
import { useTelemetryStore } from '~/stores/telemetry'
import AnalyticsHeatmap from '~/components/dashboard/AnalyticsHeatmap.vue'
import AnalyticsVolatility from '~/components/dashboard/AnalyticsVolatility.vue'
import AnalyticsRadar from '~/components/dashboard/AnalyticsRadar.vue'
import AnalyticsTopology from '~/components/dashboard/AnalyticsTopology.vue'
import AnalyticsGeo from '~/components/dashboard/AnalyticsGeo.vue'

definePageMeta({
  layout: 'dashboard'
})

const telemetry = useTelemetryStore()

const metrics = computed(() => [
  { name: 'Avg. CPU Load', value: telemetry.cpu.avg.toFixed(1) + '%', change: telemetry.cpu.trend === 'up' ? '+2.1%' : '-0.5%', icon: Activity, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { name: 'Peak Latency', value: telemetry.latency.peak + 'ms', change: '-4ms', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { name: 'Active Links', value: '142', change: '+12', icon: NetworkIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { name: 'Throughput', value: telemetry.throughput.current.toFixed(2) + ' GB/s', change: '+5%', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
])
</script>

<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="flex items-end justify-between">
      <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2 mb-2">
          <div class="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-bold text-cyan-500 uppercase tracking-widest">Advanced Visuals Active</div>
        </div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Advanced Analytics</h1>
        <p class="text-slate-500 dark:text-white/40 text-sm font-medium">Multi-dimensional performance tracking and global infrastructure insights.</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#003d4d] text-xs font-bold text-white hover:bg-[#002d39] transition-all shadow-lg shadow-[#003d4d]/20">
          Export Insights
        </button>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="metric in metrics" 
        :key="metric.name"
        class="bg-white dark:bg-[#002d39] p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm group hover:border-cyan-500/30 transition-all"
      >
        <div class="flex items-center justify-between mb-4">
          <div :class="['p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300', metric.bg, metric.color]">
            <component :is="metric.icon" :size="20" />
          </div>
          <div :class="[
            'px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider',
            metric.change.startsWith('+') ? 'bg-red-50 dark:bg-red-500/10 text-red-500' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
          ]">
            {{ metric.change }}
          </div>
        </div>
        <p class="text-slate-400 dark:text-white/20 text-[10px] font-bold uppercase tracking-[0.1em] mb-1">{{ metric.name }}</p>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ metric.value }}</h3>
      </div>
    </div>

    <!-- Analytics Visual Grid -->
    <div class="space-y-8">
      <!-- Top Row: Heatmap & Radar -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 h-[450px] shadow-sm">
          <AnalyticsHeatmap />
        </div>
        <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 h-[450px] shadow-sm">
          <AnalyticsRadar />
        </div>
      </div>

      <!-- Middle Row: Volatility & Topology & Geo -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 h-[400px] shadow-sm">
          <AnalyticsVolatility />
        </div>
        <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 h-[400px] shadow-sm">
          <AnalyticsTopology />
        </div>
        <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 h-[400px] shadow-sm">
          <AnalyticsGeo />
        </div>
      </div>
    </div>
  </div>
</template>

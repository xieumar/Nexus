<script setup lang="ts">
import { 
  Cpu, 
  Zap, 
  Globe, 
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-vue-next'
import { useLocalSession } from '~/stores/session'

definePageMeta({
  layout: 'dashboard'
})

const session = useLocalSession()

const stats = [
  { 
    name: 'CPU Utilization', 
    value: '42.5%', 
    change: '+2.4%', 
    trend: 'up',
    icon: Cpu, 
    color: 'text-cyan-500', 
    bg: 'bg-cyan-500/10' 
  },
  { 
    name: 'Avg Latency', 
    value: '18ms', 
    change: '-4ms', 
    trend: 'down',
    icon: Zap, 
    color: 'text-amber-500', 
    bg: 'bg-amber-500/10' 
  },
  { 
    name: 'Network Throughput', 
    value: '1.2 GB/s', 
    change: '+12%', 
    trend: 'up',
    icon: Globe, 
    color: 'text-blue-500', 
    bg: 'bg-blue-500/10' 
  },
  { 
    name: 'System Errors', 
    value: '0', 
    change: '0%', 
    trend: 'neutral',
    icon: AlertTriangle, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-500/10' 
  },
]
</script>

<template>
  <div class="space-y-10">
    <!-- Welcome Header -->
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight">
        Welcome back, <span class="text-[#003d4d]">{{ session.user?.name }}</span>
      </h1>
      <p class="text-slate-500 text-sm font-medium">Here's what's happening with your telemetry systems today.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="stat in stats" 
        :key="stat.name"
        class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group cursor-default"
      >
        <div class="flex items-center justify-between mb-6">
          <div :class="['p-3 rounded-2xl transition-transform duration-300 group-hover:scale-110', stat.bg, stat.color]">
            <component :is="stat.icon" :size="24" />
          </div>
          <div :class="[
            'flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider',
            stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
            stat.trend === 'down' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400'
          ]">
            <TrendingUp v-if="stat.trend === 'up'" :size="10" />
            {{ stat.change }}
          </div>
        </div>
        
        <div class="space-y-1">
          <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">{{ stat.name }}</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-slate-900">{{ stat.value }}</h3>
            <ArrowUpRight v-if="stat.trend === 'up'" :size="14" class="text-emerald-500" />
            <ArrowDownRight v-if="stat.trend === 'down'" :size="14" class="text-amber-500" />
          </div>
        </div>

        <!-- Sparkline Placeholder -->
        <div class="mt-6 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
          <div 
            :class="['h-full rounded-full transition-all duration-1000', stat.color.replace('text', 'bg')]"
            :style="{ width: '60%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Body -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Primary Chart Placeholder -->
      <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 h-[450px] flex flex-col items-center justify-center relative overflow-hidden group">
        <div class="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
          <div class="flex flex-col items-center gap-4 text-center px-12">
            <div class="h-16 w-16 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 mb-2">
              <Activity :size="32" class="animate-pulse" />
            </div>
            <h2 class="text-xl font-bold text-slate-900">ECharts Integration Coming Next</h2>
            <p class="text-sm text-slate-500 leading-relaxed">We'll be implementing real-time streaming charts with smooth 30fps updates in Phase 3.</p>
          </div>
        </div>
        <div class="w-full flex flex-col gap-8 opacity-20">
            <div class="h-8 w-48 bg-slate-200 rounded-full"></div>
            <div class="flex-1 w-full border-b-2 border-dashed border-slate-200"></div>
            <div class="flex-1 w-full border-b-2 border-dashed border-slate-200"></div>
            <div class="flex-1 w-full border-b-2 border-dashed border-slate-200"></div>
        </div>
      </div>

      <!-- Activity Feed Placeholder -->
      <div class="bg-white rounded-3xl border border-slate-100 p-8 flex flex-col">
        <div class="flex items-center justify-between mb-8">
          <h3 class="text-lg font-bold text-slate-900">Live Activity</h3>
          <button class="text-xs font-bold text-cyan-600 hover:underline">View All</button>
        </div>
        <div class="space-y-6">
          <div v-for="i in 5" :key="i" class="flex gap-4">
            <div class="h-10 w-10 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
              <Activity :size="18" />
            </div>
            <div class="space-y-1">
              <div class="h-3 w-32 bg-slate-100 rounded-full"></div>
              <div class="h-2 w-20 bg-slate-50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

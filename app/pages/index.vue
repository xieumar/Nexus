<script setup lang="ts">
import { 
  Cpu, 
  Zap, 
  Globe, 
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Pause,
  Play,
  Settings
} from 'lucide-vue-next'
import { useLocalSession } from '~/stores/session'
import { useTelemetryStore } from '~/stores/telemetry'
import { useTelemetryStream } from '~/composables/useTelemetryStream'
import { cn } from '~/lib/utils'
import { useMagicKeys, whenever } from '@vueuse/core'
import SystemPulse from '~/components/dashboard/SystemPulse.vue'
import SystemHeatmap from '~/components/dashboard/SystemHeatmap.vue'
import NodePerformanceRadar from '~/components/dashboard/NodePerformanceRadar.vue'
import NodeInspector from '~/components/dashboard/NodeInspector.vue'
import AnimatedNumber from '~/components/dashboard/AnimatedNumber.vue'

definePageMeta({
  layout: 'dashboard'
})

const session = useLocalSession()
const telemetry = useTelemetryStore()
const { startStream, stopStream } = useTelemetryStream()

onMounted(() => {
  // Stream starts automatically via useTelemetryStream watch
})

onUnmounted(() => {
  // We keep the stream running if they just switch tabs within dashboard, 
  // but stop if needed. For now, keep it alive for demo.
})

// Keyboard Shortcuts
const { p, digit1, digit5, h } = useMagicKeys()

whenever(p, () => {
  telemetry.setStreaming(!telemetry.isStreaming)
})

whenever(digit1, () => {
  telemetry.historyRange = '1m'
})

whenever(digit5, () => {
  telemetry.historyRange = '5m'
})

whenever(h, () => {
  telemetry.historyRange = '1h'
})

const stats = computed(() => [
  { 
    name: 'CPU Utilization', 
    value: telemetry.cpu.current,
    suffix: '%',
    decimals: 1,
    change: telemetry.cpu.trend === 'up' ? '+1.2%' : '-0.5%', 
    trend: telemetry.cpu.trend,
    icon: Cpu, 
    color: 'text-cyan-500', 
    bg: 'bg-cyan-500/10',
    progress: (telemetry.cpu.current / 100) * 100
  },
  { 
    name: 'Avg Latency', 
    value: telemetry.latency.current,
    suffix: 'ms',
    decimals: 0,
    change: telemetry.latency.trend === 'down' ? '-2ms' : '+1ms', 
    trend: telemetry.latency.trend === 'down' ? 'up' : 'down', 
    icon: Zap, 
    color: 'text-amber-500', 
    bg: 'bg-amber-500/10',
    progress: (telemetry.latency.current / 100) * 100
  },
  { 
    name: 'Network Throughput', 
    value: telemetry.throughput.current,
    suffix: ' GB/s',
    decimals: 2,
    change: '+0.12', 
    trend: telemetry.throughput.trend,
    icon: Globe, 
    color: 'text-blue-500', 
    bg: 'bg-blue-500/10',
    progress: (telemetry.throughput.current / 5) * 100
  },
  { 
    name: 'System Errors', 
    value: telemetry.errors.current,
    decimals: 0,
    change: telemetry.errors.current > 0 ? '+1' : '0', 
    trend: telemetry.errors.current > 0 ? 'down' : 'neutral',
    icon: AlertTriangle, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-500/10',
    progress: telemetry.errors.current > 0 ? 100 : 0
  },
])
</script>

<template>
  <div class="space-y-10">
    <!-- Welcome Header -->
    <div class="flex flex-col gap-1 px-4 md:px-0">
      <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight text-center md:text-left">
        Welcome back, <span class="text-[#003d4d] dark:text-cyan-400">{{ session.user?.name }}</span>
      </h1>
      <p class="text-slate-500 dark:text-white/40 text-sm font-medium text-center md:text-left">Here's what's happening with your telemetry systems today.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
      <div 
        v-for="stat in stats" 
        :key="stat.name"
        class="bg-white dark:bg-[#002d39] p-4 md:p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300 group cursor-default"
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
          <p class="text-slate-400 dark:text-white/30 text-xs font-bold uppercase tracking-widest">{{ stat.name }}</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
              <AnimatedNumber 
                :value="stat.value" 
                :decimals="stat.decimals" 
                :suffix="stat.suffix" 
              />
            </h3>
            <ArrowUpRight v-if="stat.trend === 'up'" :size="14" class="text-emerald-500" />
            <ArrowDownRight v-if="stat.trend === 'down'" :size="14" class="text-amber-500" />
          </div>
        </div>

        <!-- Sparkline Placeholder -->
        <div class="mt-6 h-1 w-full bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
          <div 
            :class="cn('h-full rounded-full transition-all duration-1000', stat.color.replace('text', 'bg'))"
            :style="{ width: '60%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard Body -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
      <!-- Primary System Pulse Chart -->
      <div class="lg:col-span-2 bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-4 md:p-8 flex flex-col relative overflow-hidden group">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 shrink-0 gap-4">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">System Telemetry</h3>
            <div :class="cn(
              'flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300',
              telemetry.isStreaming ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
            )">
              <div :class="cn('h-1.5 w-1.5 rounded-full', telemetry.isStreaming ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500')"></div>
              {{ telemetry.isStreaming ? 'Live' : 'Paused' }}
            </div>
          </div>
          
          <div class="flex items-center justify-between sm:justify-end gap-2">
            <!-- Range Selector -->
            <div class="flex items-center p-1 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl">
              <button 
                v-for="range in ['1m', '5m', '1h']" 
                :key="range"
                @click="telemetry.historyRange = range"
                :class="cn(
                  'px-3 py-1 rounded-lg text-[10px] font-bold transition-all duration-200',
                  telemetry.historyRange === range ? 'bg-white dark:bg-white/10 text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:text-white/40 dark:hover:text-white'
                )"
              >
                {{ range }}
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button 
                @click="telemetry.setStreaming(!telemetry.isStreaming)"
                class="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
                :title="telemetry.isStreaming ? 'Pause Stream' : 'Resume Stream'"
              >
                <Pause v-if="telemetry.isStreaming" :size="16" />
                <Play v-else :size="16" />
              </button>
              <button class="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200">
                <Settings :size="16" />
              </button>
            </div>
          </div>
        </div>
        <SystemPulse />
      </div>

      <!-- Activity Feed -->
      <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-6 md:p-8 flex flex-col h-[400px] md:h-[450px] shadow-sm">
        <div class="flex items-center justify-between mb-6 shrink-0">
          <h1 class="text-lg font-bold text-slate-900 dark:text-white">Live Activity</h1>
          <button class="text-xs font-bold text-[#003d4d] dark:text-cyan-400 hover:underline">View All</button>
        </div>
        
        <!-- Virtualized Feed -->
        <div class="flex-1 min-h-0 -mx-2">
          <RecycleScroller
            class="h-full px-2 custom-scrollbar"
            :items="telemetry.events"
            :item-size="64"
            key-field="id"
            v-slot="{ item }"
          >
            <div class="py-2">
              <div class="flex gap-4 group">
                <div :class="[
                  'h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300',
                  item.severity === 'critical' ? 'bg-red-50 dark:bg-red-500/10 text-red-500' :
                  item.severity === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' :
                  'bg-slate-50 dark:bg-white/5 text-slate-400'
                ]">
                  <Activity :size="18" />
                </div>
                <div class="flex-1 min-w-0 space-y-1">
                  <p class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ item.message }}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] text-slate-400 dark:text-white/20 font-bold uppercase tracking-widest">{{ item.source }}</span>
                    <span class="text-[10px] text-slate-300 dark:text-white/10">{{ new Date(item.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </RecycleScroller>
        </div>

        <!-- Empty State -->
        <div v-if="telemetry.events.length === 0" class="flex flex-col items-center justify-center py-20 opacity-30 text-center space-y-3">
          <Activity :size="48" />
          <p class="text-xs font-bold">Waiting for system logs...</p>
        </div>
      </div>
    </div>

    <!-- Secondary Dashboard Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0 pb-10">
      <!-- Heatmap View -->
      <div class="lg:col-span-2 bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-6 md:p-8 flex flex-col shadow-sm min-h-[350px]">
        <SystemHeatmap />
      </div>

      <!-- Radar View -->
      <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-6 md:p-8 flex flex-col shadow-sm min-h-[350px]">
        <NodePerformanceRadar />
      </div>
    </div>

    <!-- Slide-over Inspector -->
    <Teleport to="body">
      <NodeInspector />
    </Teleport>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

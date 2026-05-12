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
  Play
} from 'lucide-vue-next'
import { useLocalSession } from '~/stores/session'
import { useTelemetryStore } from '~/stores/telemetry'
import { useTelemetryStream } from '~/composables/useTelemetryStream'
import { cn } from '~/lib/utils'
import SystemPulse from '~/components/dashboard/SystemPulse.vue'
import SystemHeatmap from '~/components/dashboard/SystemHeatmap.vue'
import NodePerformanceRadar from '~/components/dashboard/NodePerformanceRadar.vue'
import NodeInspector from '~/components/dashboard/NodeInspector.vue'

definePageMeta({
  layout: 'dashboard'
})

const session = useLocalSession()
const telemetry = useTelemetryStore()
const { startStream, stopStream } = useTelemetryStream()

onMounted(() => {
  startStream()
})

onUnmounted(() => {
  // We keep the stream running if they just switch tabs within dashboard, 
  // but stop if needed. For now, keep it alive for demo.
})

const stats = computed(() => [
  { 
    name: 'CPU Utilization', 
    value: `${telemetry.cpu.current}%`, 
    change: telemetry.cpu.trend === 'up' ? '+1.2%' : '-0.5%', 
    trend: telemetry.cpu.trend,
    icon: Cpu, 
    color: 'text-cyan-500', 
    bg: 'bg-cyan-500/10',
    progress: (telemetry.cpu.current / 100) * 100
  },
  { 
    name: 'Avg Latency', 
    value: `${telemetry.latency.current}ms`, 
    change: telemetry.latency.trend === 'down' ? '-2ms' : '+1ms', 
    trend: telemetry.latency.trend === 'down' ? 'up' : 'down', // Reverse trend for latency (down is good/up)
    icon: Zap, 
    color: 'text-amber-500', 
    bg: 'bg-amber-500/10',
    progress: (telemetry.latency.current / 100) * 100
  },
  { 
    name: 'Network Throughput', 
    value: `${telemetry.throughput.current} GB/s`, 
    change: '+0.12', 
    trend: telemetry.throughput.trend,
    icon: Globe, 
    color: 'text-blue-500', 
    bg: 'bg-blue-500/10',
    progress: (telemetry.throughput.current / 5) * 100
  },
  { 
    name: 'System Errors', 
    value: telemetry.errors.current.toString(), 
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
      <!-- Primary System Pulse Chart -->
      <div class="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 flex flex-col relative overflow-hidden group">
        <div class="flex items-center justify-between mb-2 shrink-0">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-bold text-slate-900">System Telemetry</h3>
            <div :class="cn(
              'flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300',
              telemetry.isStreaming ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
            )">
              <div :class="cn('h-1.5 w-1.5 rounded-full', telemetry.isStreaming ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500')"></div>
              {{ telemetry.isStreaming ? 'Live' : 'Paused' }}
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <!-- Range Selector -->
            <div class="flex items-center p-1 bg-slate-50 border border-slate-100 rounded-xl mr-2">
              <button 
                v-for="range in ['1m', '5m', '1h']" 
                :key="range"
                @click="telemetry.historyRange = range"
                :class="cn(
                  'px-3 py-1 rounded-lg text-[10px] font-bold transition-all duration-200',
                  telemetry.historyRange === range ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                )"
              >
                {{ range }}
              </button>
            </div>

            <button 
              @click="telemetry.setStreaming(!telemetry.isStreaming)"
              class="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
              :title="telemetry.isStreaming ? 'Pause Stream' : 'Resume Stream'"
            >
              <Pause v-if="telemetry.isStreaming" :size="16" />
              <Play v-else :size="16" />
            </button>
            <button class="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200">
              <Settings :size="16" />
            </button>
          </div>
        </div>
        <SystemPulse />
      </div>

      <!-- Activity Feed -->
      <div class="bg-white rounded-3xl border border-slate-100 p-8 flex flex-col h-[450px]">
        <div class="flex items-center justify-between mb-8 shrink-0">
          <h3 class="text-lg font-bold text-slate-900">Live Activity</h3>
          <button class="text-xs font-bold text-cyan-600 hover:underline">View All</button>
        </div>
        <div class="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-hide">
          <TransitionGroup name="list">
            <div v-for="event in telemetry.events" :key="event.id" class="flex gap-4">
              <div :class="cn(
                'h-10 w-10 shrink-0 rounded-xl flex items-center justify-center',
                event.severity === 'critical' ? 'bg-red-50 text-red-500' :
                event.severity === 'success' ? 'bg-emerald-50 text-emerald-500' :
                'bg-slate-50 text-slate-400'
              )">
                <Activity :size="18" />
              </div>
              <div class="flex-1 min-w-0 space-y-1">
                <p class="text-xs font-bold text-slate-900 truncate">{{ event.message }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-[10px] text-slate-400 font-bold uppercase">{{ event.source }}</span>
                  <span class="text-[10px] text-slate-300">{{ new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) }}</span>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- Empty State -->
          <div v-if="telemetry.events.length === 0" class="flex flex-col items-center justify-center h-full opacity-30 text-center space-y-3">
            <Activity :size="48" />
            <p class="text-xs font-bold">Waiting for system logs...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Secondary Dashboard Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Heatmap View -->
      <div class="lg:col-span-2 bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 flex flex-col shadow-sm">
        <SystemHeatmap />
      </div>

      <!-- Radar View -->
      <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 flex flex-col shadow-sm">
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

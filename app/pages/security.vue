<script setup lang="ts">
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Eye, 
  ShieldAlert,
  Fingerprint,
  Globe,
  AlertTriangle
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const securityMetrics = [
  { name: 'Threat Level', value: 'Low', status: 'Safe', icon: ShieldCheck, color: 'text-emerald-500' },
  { name: 'Active Firewalls', value: '12', status: 'Optimal', icon: Lock, color: 'text-blue-500' },
  { name: 'Encrypted Data', value: '99.9%', status: 'Secure', icon: Key, color: 'text-cyan-500' },
]

const recentIncidents = [
  { id: 1, type: 'Brute Force Attempt', node: 'Edge Alpha', time: '10m ago', severity: 'Low' },
  { id: 2, type: 'Unauthorized API Access', node: 'Storage Core', time: '1h ago', severity: 'Medium' },
  { id: 3, type: 'DDoS Mitigation Active', node: 'Global Edge', time: '4h ago', severity: 'High' },
]
</script>

<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Security Analytics</h1>
      <p class="text-slate-500 dark:text-white/40 text-sm font-medium">Global threat monitoring and infrastructure protection.</p>
    </div>

    <!-- Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="metric in securityMetrics" :key="metric.name" class="bg-white dark:bg-[#002d39] p-6 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
        <div class="flex items-center gap-4 mb-4">
          <div :class="['p-3 rounded-2xl bg-slate-50 dark:bg-white/5', metric.color]">
            <component :is="metric.icon" :size="24" />
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ metric.name }}</p>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ metric.value }}</h3>
          </div>
        </div>
        <div class="flex items-center gap-2">
           <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
           <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400">{{ metric.status }}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <!-- Active Threats -->
       <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8">
         <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Security Events</h3>
         <div class="space-y-4">
            <div v-for="incident in recentIncidents" :key="incident.id" class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5">
              <div class="flex items-center gap-4">
                <div :class="[
                  'h-10 w-10 rounded-xl flex items-center justify-center',
                  incident.severity === 'High' ? 'bg-red-50 dark:bg-red-500/10 text-red-500' :
                  incident.severity === 'Medium' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-500' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-500'
                ]">
                  <ShieldAlert :size="20" />
                </div>
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ incident.type }}</p>
                  <p class="text-xs text-slate-400 font-medium">{{ incident.node }} • {{ incident.time }}</p>
                </div>
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">{{ incident.severity }}</span>
            </div>
         </div>
       </div>

       <!-- Security Map Placeholder -->
       <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-8 flex flex-col items-center justify-center text-center">
         <div class="p-6 rounded-full bg-cyan-50 dark:bg-cyan-500/5 mb-6">
           <Globe :size="48" class="text-cyan-500 animate-pulse" />
         </div>
         <h3 class="text-lg font-bold text-slate-900 dark:text-white">Global Attack Map</h3>
         <p class="text-sm text-slate-500 dark:text-white/40 max-w-xs mt-2 mb-6">Visualizing real-time intrusion attempts across geographic nodes.</p>
         <button class="px-8 py-3 rounded-xl bg-[#003d4d] text-white font-bold text-xs hover:bg-[#002d39] transition-all">Initialize Security View</button>
       </div>
    </div>
  </div>
</template>

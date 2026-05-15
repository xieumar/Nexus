<script setup lang="ts">
import { 
  Bell, 
  Settings, 
  Mail, 
  MessageSquare, 
  AlertTriangle,
  Zap,
  Clock,
  MoreHorizontal
} from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard'
})

const notifications = [
  { id: 1, title: 'Critical Alert: Node-7 Failure', description: 'Immediate attention required for Storage Core Node-7.', time: '2 mins ago', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10' },
  { id: 2, title: 'System Optimized', description: 'Automatic resource reallocation completed successfully.', time: '1 hour ago', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { id: 3, title: 'Weekly Report Ready', description: 'Your system performance summary for the past week is available.', time: '5 hours ago', icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { id: 4, title: 'Security Patch Applied', description: 'Security update v4.2.1 has been deployed to all edge nodes.', time: 'Yesterday', icon: Bell, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
]
</script>

<template>
  <div class="max-w-4xl space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 md:px-0">
      <div class="flex flex-col gap-1 text-center sm:text-left">
        <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Notifications</h1>
        <p class="text-slate-500 dark:text-white/40 text-sm font-medium">Stay updated with system alerts and personal messages.</p>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <button class="px-4 py-2 rounded-xl bg-white dark:bg-[#002d39] border border-slate-100 dark:border-white/5 text-xs font-bold text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/10 transition-all">Mark all as read</button>
        <button class="p-2.5 rounded-xl bg-white dark:bg-[#002d39] border border-slate-100 dark:border-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
          <Settings :size="20" />
        </button>
      </div>
    </div>

    <!-- Notification List -->
    <div class="space-y-4 px-4 md:px-0">
      <div 
        v-for="note in notifications" 
        :key="note.id"
        class="group bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all duration-300 cursor-pointer gap-4"
      >
        <div class="flex items-start sm:items-center gap-4 md:gap-6">
          <div :class="['h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300', note.bg, note.color]">
            <component :is="note.icon" :size="24" class="md:hidden" />
            <component :is="note.icon" :size="28" class="hidden md:block" />
          </div>
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2 md:gap-3">
              <h3 class="text-base md:text-lg font-bold text-slate-900 dark:text-white">{{ note.title }}</h3>
              <span class="text-[9px] md:text-[10px] font-bold text-slate-300 uppercase whitespace-nowrap">{{ note.time }}</span>
            </div>
            <p class="text-xs md:text-sm text-slate-500 dark:text-white/40 leading-relaxed max-w-lg">{{ note.description }}</p>
          </div>
        </div>
        <button class="self-end sm:self-center p-2 text-slate-300 dark:text-white/10 hover:text-slate-600 dark:hover:text-white">
          <MoreHorizontal :size="20" />
        </button>
      </div>
    </div>

    <!-- Empty State Footer -->
    <div class="py-12 text-center">
      <p class="text-xs font-bold text-slate-300 uppercase tracking-widest">No more notifications</p>
    </div>
  </div>
</template>

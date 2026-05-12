<script setup lang="ts">
import { 
  User, 
  Bell, 
  Shield, 
  Moon,
  Sun,
  Database,
  LogOut
} from 'lucide-vue-next'
import { useLocalSession } from '~/stores/session'

definePageMeta({
  layout: 'dashboard'
})

const session = useLocalSession()
const { toggleTheme, isDark } = useTheme()

const sections = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'appearance', name: 'Appearance', icon: Sun },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'billing', name: 'Data & Storage', icon: Database },
]

const activeSection = ref('appearance')
</script>

<template>
  <div class="max-w-4xl space-y-10">
    <!-- Header -->
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h1>
      <p class="text-slate-500 dark:text-white/40 text-sm font-medium">Manage your account preferences and system configurations.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
      <!-- Sidebar Nav -->
      <nav class="flex flex-col gap-1">
        <button 
          v-for="section in sections" 
          :key="section.id"
          @click="activeSection = section.id"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all',
            activeSection === section.id 
              ? 'bg-[#003d4d] text-white shadow-lg shadow-[#003d4d]/10' 
              : 'text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/5'
          ]"
        >
          <component :is="section.icon" :size="18" />
          {{ section.name }}
        </button>
      </nav>

      <!-- Content -->
      <div class="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
        <!-- Appearance Section -->
        <div v-if="activeSection === 'appearance'" class="space-y-6">
          <div class="space-y-1">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">Appearance</h3>
            <p class="text-sm text-slate-500 dark:text-white/40">Customize how Nexus Pulse looks on your screen.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              @click="toggleTheme"
              :class="[
                'p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4',
                !isDark 
                  ? 'border-[#003d4d] bg-white dark:bg-[#002d39]' 
                  : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 opacity-60 hover:opacity-100'
              ]"
            >
              <div class="h-12 w-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                <Sun :size="24" />
              </div>
              <div class="text-center">
                <p class="font-bold text-slate-900 dark:text-white">Nexus Clean</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Light Mode</p>
              </div>
            </button>

            <button 
              @click="toggleTheme"
              :class="[
                'p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4',
                isDark 
                  ? 'border-cyan-500 bg-white dark:bg-[#002d39]' 
                  : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 opacity-60 hover:opacity-100'
              ]"
            >
              <div class="h-12 w-12 rounded-2xl bg-cyan-900 text-cyan-400 flex items-center justify-center shadow-inner">
                <Moon :size="24" />
              </div>
              <div class="text-center">
                <p class="font-bold text-slate-900 dark:text-white">Nexus Pulse</p>
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dark Mode</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Profile Section -->
        <div v-if="activeSection === 'profile'" class="space-y-6">
          <div class="space-y-1">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">User Profile</h3>
            <p class="text-sm text-slate-500 dark:text-white/40">Manage your personal information and public profile.</p>
          </div>

          <div class="bg-white dark:bg-[#002d39] border border-slate-100 dark:border-white/5 rounded-3xl p-8 flex flex-col items-center text-center">
            <div class="h-24 w-24 rounded-3xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-4xl font-bold text-white mb-6 shadow-2xl shadow-cyan-500/20">
              {{ session.user?.name?.[0]?.toUpperCase() }}
            </div>
            <h4 class="text-xl font-bold text-slate-900 dark:text-white">{{ session.user?.name }}</h4>
            <p class="text-sm text-slate-500 dark:text-white/40 mb-8">{{ session.user?.email }}</p>
            
            <button 
              @click="session.logout"
              class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
            >
              <LogOut :size="16" />
              Sign Out Account
            </button>
          </div>
        </div>

        <!-- Other sections placeholders -->
        <div v-if="['notifications', 'security', 'billing'].includes(activeSection)" class="py-20 flex flex-col items-center justify-center text-center opacity-30">
          <div class="h-16 w-16 rounded-full border-2 border-slate-300 dark:border-white/20 flex items-center justify-center mb-4">
             <component :is="sections.find(s => s.id === activeSection)?.icon" :size="32" />
          </div>
          <h3 class="text-lg font-bold">Coming Soon</h3>
          <p class="text-sm max-w-xs">We're building advanced management tools for this section.</p>
        </div>
      </div>
    </div>
  </div>
</template>

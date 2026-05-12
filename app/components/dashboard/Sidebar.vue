<script setup lang="ts">
import { 
  LayoutDashboard, 
  Activity, 
  Bell, 
  Settings, 
  ChevronLeft, 
  LogOut,
  Terminal,
  Database,
  ShieldCheck,
  X
} from 'lucide-vue-next'
import { useLocalSession } from '~/stores/session'
import { cn } from '~/lib/utils'

defineEmits(['close'])

const session = useLocalSession()
const isCollapsed = ref(false)

// We use a separate state to handle the collapse ONLY on desktop
// On mobile, the sidebar is either visible or not, but always "expanded"
const desktopCollapsed = computed(() => isCollapsed.value)

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Analytics', icon: Activity, path: '/analytics' },
  { name: 'System Logs', icon: Terminal, path: '/logs' },
  { name: 'Telemetry', icon: Database, path: '/telemetry' },
  { name: 'Security', icon: ShieldCheck, path: '/security' },
]

const secondaryItems = [
  { name: 'Notifications', icon: Bell, path: '/notifications' },
  { name: 'Settings', icon: Settings, path: '/settings' },
]

const route = useRoute()
const isActive = (path: string) => route.path === path

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <aside 
    :class="cn(
      'flex flex-col bg-[#002d39] text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-r border-white/5 h-screen overflow-hidden shrink-0',
      'w-[280px] lg:translate-x-0', // Mobile width
      desktopCollapsed ? 'lg:w-20' : 'lg:w-64' // Desktop width
    )"
  >
    <!-- Logo Section -->
    <div 
      @click="isCollapsed = !isCollapsed"
      :class="cn(
        'flex items-center h-20 shrink-0 border-b border-white/5 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer hover:bg-white/5', 
        desktopCollapsed ? 'lg:px-0 lg:justify-center lg:gap-0 px-6 gap-3' : 'px-6 gap-3'
      )"
    >
      <img src="/logo.png" alt="Nexus Logo" :class="cn('h-10 w-auto transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]', desktopCollapsed ? 'lg:h-8' : 'h-10')" />
      <div 
        :class="cn(
          'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden flex-1 flex items-center justify-between',
          desktopCollapsed ? 'lg:max-w-0 lg:opacity-0 opacity-100 max-w-[200px]' : 'max-w-[200px] opacity-100'
        )"
      >
        <span class="text-xl font-bold tracking-tight whitespace-nowrap">
          Nexus <span class="text-cyan-400">Pulse</span>
        </span>

        <!-- Mobile Close Button -->
        <button 
          @click.stop="$emit('close')"
          class="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
        >
          <X :size="20" />
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-8 scrollbar-hide">
      <!-- Main Menu -->
      <div class="space-y-1">
        <p 
          :class="cn(
            'px-3 mb-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] transition-all duration-300',
            desktopCollapsed ? 'lg:opacity-0 lg:scale-0 opacity-100 scale-100' : 'opacity-100 scale-100'
          )"
        >
          Menu
        </p>
        <NuxtLink
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          :class="cn(
            'group flex items-center py-2.5 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] relative',
            desktopCollapsed ? 'lg:justify-center lg:px-0 lg:gap-0 px-3 gap-3' : 'px-3 gap-3',
            isActive(item.path) 
              ? 'bg-cyan-500/10 text-cyan-400 font-semibold' 
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          )"
        >
          <component :is="item.icon" :size="20" :stroke-width="isActive(item.path) ? 2.5 : 2" class="shrink-0" />
          <div 
            :class="cn(
              'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden',
              desktopCollapsed ? 'lg:max-w-0 lg:opacity-0 opacity-100 max-w-[200px]' : 'max-w-[200px] opacity-100'
            )"
          >
            <span class="text-sm whitespace-nowrap">{{ item.name }}</span>
          </div>
          
          <!-- Active Indicator -->
          <div v-if="isActive(item.path)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
        </NuxtLink>
      </div>

      <!-- System Menu -->
      <div class="space-y-1">
        <p 
          :class="cn(
            'px-3 mb-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] transition-all duration-300',
            desktopCollapsed ? 'lg:opacity-0 lg:scale-0 opacity-100 scale-100' : 'opacity-100 scale-100'
          )"
        >
          System
        </p>
        <NuxtLink
          v-for="item in secondaryItems"
          :key="item.name"
          :to="item.path"
          :class="cn(
            'group flex items-center py-2.5 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] relative',
            desktopCollapsed ? 'lg:justify-center lg:px-0 lg:gap-0 px-3 gap-3' : 'px-3 gap-3',
            isActive(item.path) 
              ? 'bg-cyan-500/10 text-cyan-400' 
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          )"
        >
          <component :is="item.icon" :size="20" class="shrink-0" />
          <div 
            :class="cn(
              'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden',
              desktopCollapsed ? 'lg:max-w-0 lg:opacity-0 opacity-100 max-w-[200px]' : 'max-w-[200px] opacity-100'
            )"
          >
            <span class="text-sm whitespace-nowrap">{{ item.name }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- User Section -->
    <div class="p-3 border-t border-white/5 bg-[#00252e]">
      <div :class="cn('flex items-center gap-3', desktopCollapsed ? 'lg:justify-center lg:px-0 px-1' : 'px-1')">
        <!-- Avatar -->
        <div class="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center font-bold text-xs shadow-lg shadow-cyan-500/10">
          {{ session.user?.name?.[0]?.toUpperCase() || 'U' }}
        </div>
        
        <!-- User Info & Logout -->
        <div 
          :class="cn(
            'flex items-center justify-between flex-1 min-w-0 transition-all duration-500 overflow-hidden',
            desktopCollapsed ? 'lg:max-w-0 lg:opacity-0 opacity-100 max-w-[200px]' : 'max-w-[200px] opacity-100'
          )"
        >
          <div class="flex flex-col min-w-0 mr-2">
            <span class="text-sm font-bold truncate text-white leading-tight">{{ session.user?.name || 'User' }}</span>
            <span class="text-[10px] text-white/40 truncate">{{ session.user?.email }}</span>
          </div>
          
          <button 
            @click="session.logout"
            class="p-2 rounded-lg text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 shrink-0"
            title="Sign Out"
          >
            <LogOut :size="16" />
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

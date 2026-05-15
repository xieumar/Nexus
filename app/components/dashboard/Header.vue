<script setup lang="ts">
import { Search, Bell, Command, Sun, Moon, Menu } from 'lucide-vue-next'
import { cn } from '~/lib/utils'

defineEmits(['toggle-menu'])

const isSearchFocused = ref(false)
const systemStatus = ref('Optimal')

const { toggleTheme, isDark } = useTheme()
</script>

<template>
  <header class="h-20 border-b border-slate-100 bg-white/80 dark:bg-[#002d39]/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300">
    <!-- Left: Hamburger + Search -->
    <div class="flex items-center gap-4 flex-1 max-w-xl">
      <button 
        @click="$emit('toggle-menu')"
        class="lg:hidden p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-white/60 transition-colors"
      >
        <Menu :size="24" />
      </button>

      <div 
        :class="cn(
          'relative hidden sm:flex items-center w-full transition-all duration-300 rounded-2xl bg-slate-50 dark:bg-white/5 border px-4 h-11',
          isSearchFocused ? 'border-cyan-500 ring-4 ring-cyan-500/5 bg-white dark:bg-slate-900' : 'border-transparent'
        )"
      >
        <Search :size="18" class="text-slate-400 dark:text-white/20 shrink-0" />
        <input 
          type="text" 
          placeholder="Search telemetry, nodes, or logs..." 
          class="bg-transparent border-none outline-none w-full px-3 text-sm text-slate-700 dark:text-white/70 placeholder:text-slate-400 dark:placeholder:text-white/20"
          @focus="isSearchFocused = true"
          @blur="isSearchFocused = false"
        />
      </div>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-6">
      <!-- Action Buttons -->
      <div class="flex items-center gap-3">
        <button class="relative p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-100 dark:hover:border-white/10">
          <Bell :size="20" />
          <span class="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-[#002d39]"></span>
        </button>
        <button 
          @click="toggleTheme"
          class="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-100 dark:hover:border-white/10"
        >
          <Sun v-if="isDark" :size="20" class="animate-in fade-in zoom-in duration-300" />
          <Moon v-else :size="20" class="animate-in fade-in zoom-in duration-300" />
        </button>
      </div>

    </div>
  </header>
</template>

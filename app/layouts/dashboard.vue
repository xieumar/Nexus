<script setup lang="ts">
import Sidebar from '~/components/dashboard/Sidebar.vue'
import Header from '~/components/dashboard/Header.vue'
import { cn } from '~/lib/utils'

const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu when route changes
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<template>
  <div class="flex h-screen bg-slate-50 overflow-hidden text-slate-900 font-sans relative">
    <!-- Mobile Sidebar Overlay (Backdrop) -->
    <Transition name="fade">
      <div 
        v-if="isMobileMenuOpen" 
        class="fixed inset-0 bg-[#002d39]/60 backdrop-blur-md z-[100] lg:hidden"
        @click="isMobileMenuOpen = false"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <!-- On mobile: fixed, slide-in drawer. On desktop: relative, collapsible. -->
    <Sidebar 
      :class="cn(
        'fixed inset-y-0 left-0 z-[110] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:relative lg:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )"
      :is-mobile="true"
      @close="isMobileMenuOpen = false"
    />

    <!-- Main Content Panel -->
    <div class="flex-1 flex flex-col min-w-0 relative">
      <Header @toggle-menu="toggleMobileMenu" />
      
      <!-- Content Area -->
      <main class="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>

      <!-- Background Ambient Glows -->
      <div class="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div class="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
/* Nuxt page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

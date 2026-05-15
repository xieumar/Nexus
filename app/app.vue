<script setup lang="ts">
import { useLocalSession } from '~/stores/session'
import { useToastStore } from '~/stores/toasts'
import Toaster from '~/components/ui/Toaster.vue'

const session = useLocalSession()
const toast = useToastStore()
const isInitializing = ref(true)

onMounted(() => {
  // session.init() is already called in the store's setup
  // We just wait for the splash screen duration
  setTimeout(() => {
    isInitializing.value = false
    toast.info('Terminal System Initialized', 'Nexus core services are online.')
  }, 2000)
})
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] font-sans antialiased">
    <!-- Splash Screen (Always covers everything during init) -->
    <Transition name="splash">
      <SplashScreen v-if="isInitializing" />
    </Transition>

    <!-- Main Content (Only mounts after init to prevent hydration bleeding) -->
    <div v-if="!isInitializing">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <!-- Global Toaster -->
    <Toaster />
  </div>
</template>

<style>
/* Splash Screen Transition */
.splash-enter-active,
.splash-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.splash-enter-from,
.splash-leave-to {
  opacity: 0;
}

/* Global transitions for page changes */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

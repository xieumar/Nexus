<script setup lang="ts">
import { useLocalSession } from '~/stores/session'

const session = useLocalSession()
const isInitializing = ref(true)

onMounted(() => {
  // session.init() is already called in the store's setup
  // We just wait for the splash screen duration
  setTimeout(() => {
    isInitializing.value = false
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

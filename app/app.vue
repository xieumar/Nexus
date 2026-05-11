<script setup lang="ts">
import { useLocalSession } from '~/stores/session'

const session = useLocalSession()

onMounted(() => {
  session.init()
})
</script>

<template>
  <div class="min-h-screen bg-background font-sans antialiased">
    <SplashScreen />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
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

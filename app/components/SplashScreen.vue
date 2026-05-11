<script setup lang="ts">
const props = defineProps<{
  loading?: boolean
}>()

const visible = ref(true)

onMounted(() => {
  // We keep it visible for at least 2 seconds as per typical premium splash screens
  setTimeout(() => {
    visible.value = false
  }, 2000)
})
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-app)]">
      <div class="relative flex flex-col items-center">
        <!-- Logo Container -->
        <div class="relative mb-8">
          <img src="/logo.png" alt="Nexus Logo" class="relative h-24 w-auto object-contain" />
        </div>
        
        <!-- Loading Text -->
        <div class="flex flex-col items-center gap-4">
          <h2 class="text-2xl font-bold tracking-[0.2em] text-[var(--text-primary)] uppercase">
            Nexus <span class="text-cyan-500">Pulse</span>
          </h2>
          
          <!-- Loading Bar -->
          <div class="h-[2px] w-48 overflow-hidden rounded-full bg-[var(--border-color)]">
            <div class="h-full animate-progress bg-cyan-500"></div>
          </div>
          
          <p class="text-sm font-medium tracking-widest text-[var(--text-muted)] uppercase">
            Initializing Systems
          </p>
        </div>
      </div>

      <!-- Background Ambient Glow -->
      <div class="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]"></div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-progress {
  animation: progress 2s infinite linear;
}
</style>

<script setup lang="ts">
import { useToastStore } from '~/stores/toasts'
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-vue-next'

const store = useToastStore()

onMounted(() => {
  console.log('Toaster component mounted')
})
</script>

<template>
  <div class="fixed top-6 right-6 z-[300] flex flex-col gap-3 pointer-events-none w-full max-w-[380px]">
    <TransitionGroup name="toast">
      <div 
        v-for="toast in store.toasts" 
        :key="toast.id"
        class="pointer-events-auto relative w-full bg-white dark:bg-[#002d39] rounded-2xl border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none p-4 overflow-hidden group"
      >
        <div class="flex gap-4">
          <!-- Icon -->
          <div :class="[
            'h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300',
            toast.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' :
            toast.type === 'error' ? 'bg-red-50 dark:bg-red-500/10 text-red-500' :
            toast.type === 'warning' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-500' :
            'bg-blue-50 dark:bg-blue-500/10 text-blue-500'
          ]">
            <CheckCircle2 v-if="toast.type === 'success'" :size="20" />
            <AlertCircle v-else-if="toast.type === 'error'" :size="20" />
            <AlertTriangle v-else-if="toast.type === 'warning'" :size="20" />
            <Info v-else :size="20" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0 pr-4">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {{ toast.title }}
            </h3>
            <p v-if="toast.description" class="text-xs text-slate-500 dark:text-white/40 mt-1 line-clamp-2 leading-relaxed">
              {{ toast.description }}
            </p>
          </div>

          <!-- Close -->
          <button 
            @click="store.remove(toast.id)"
            class="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 dark:text-white/20 transition-colors"
          >
            <X :size="14" />
          </button>
        </div>

        <!-- Progress Bar (optional visually) -->
        <div 
          class="absolute bottom-0 left-0 h-1 bg-current opacity-10 transition-all duration-5000 ease-linear"
          :class="[
            toast.type === 'success' ? 'text-emerald-500' :
            toast.type === 'error' ? 'text-red-500' :
            toast.type === 'warning' ? 'text-amber-500' :
            'text-blue-500'
          ]"
          :style="{ width: '0%', animation: 'toast-progress 5s linear forwards' }"
        ></div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes toast-progress {
  from { width: 100%; }
  to { width: 0%; }
}
</style>

<script setup lang="ts">
import { LogOut, X } from 'lucide-vue-next'
import { useLocalSession } from '~/stores/session'
import { useToastStore } from '~/stores/toasts'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
const session = useLocalSession()
const toast = useToastStore()

const logout = async () => {
  toast.info('Terminating session...', 'Please wait while we secure your data.')
  
  setTimeout(() => {
    session.logout()
    toast.success('Logged out successfully')
  }, 1000)
  
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-slate-900/40 backdrop-blur-md" 
        @click="emit('close')"
      ></div>

      <!-- Modal Card -->
      <div class="relative w-full max-w-md bg-white dark:bg-[#002d39] rounded-[32px] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden p-8">
        <button 
          @click="emit('close')"
          class="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 dark:text-white/40 transition-colors"
        >
          <X :size="20" />
        </button>

        <div class="flex flex-col items-center text-center space-y-6">
          <div class="h-16 w-16 rounded-3xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500">
            <LogOut :size="32" />
          </div>

          <div class="space-y-2">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Confirm Logout</h3>
            <p class="text-sm text-slate-500 dark:text-white/40 leading-relaxed">
              Are you sure you want to terminate your current session? You will need to re-authenticate to access the Nexus terminal.
            </p>
          </div>

          <div class="flex flex-col w-full gap-3">
            <button 
              @click="logout"
              class="w-full py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-red-500/20 active:scale-[0.98]"
            >
              Sign Out
            </button>
            <button 
              @click="emit('close')"
              class="w-full py-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-white/60 font-bold text-sm transition-all duration-300 active:scale-[0.98]"
            >
              Stay Logged In
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.modal-enter-active .absolute,
.modal-leave-active .absolute {
  transition: opacity 0.4s ease;
}

.modal-enter-from .absolute,
.modal-leave-to .absolute {
  opacity: 0;
}
</style>

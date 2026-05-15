import { defineStore } from 'pinia'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
}

export const useToastStore = defineStore('toasts', () => {
  const toasts = ref<Toast[]>([])

  const add = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const newToast = { ...toast, id }
    toasts.value.push(newToast)

    if (toast.duration !== 0) {
      setTimeout(() => {
        remove(id)
      }, toast.duration || 5000)
    }
    
    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    add,
    remove,
    success: (title: string, description?: string | null) => add({ title, description: description ?? undefined, type: 'success' }),
    error: (title: string, description?: string | null) => add({ title, description: description ?? undefined, type: 'error' }),
    info: (title: string, description?: string | null) => add({ title, description: description ?? undefined, type: 'info' }),
    warning: (title: string, description?: string | null) => add({ title, description: description ?? undefined, type: 'warning' })
  }
})

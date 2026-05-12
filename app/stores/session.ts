import { defineStore } from 'pinia'

export interface SessionUser {
  name: string
  email: string
}

export const useLocalSession = defineStore('localSession', () => {
  const user = ref<SessionUser | null>(null)
  const loggedInAt = ref<Date | null>(null)

  const login = (userData: SessionUser) => {
    user.value = userData
    loggedInAt.value = new Date()
    // Persist to localStorage for persistence across refreshes
    if (import.meta.client) {
      localStorage.setItem('nexus_session', JSON.stringify({ user: userData, loggedInAt: loggedInAt.value }))
    }
  }

  const logout = () => {
    user.value = null
    loggedInAt.value = null
    if (import.meta.client) {
      localStorage.removeItem('nexus_session')
    }
    navigateTo('/login')
  }

  const init = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('nexus_session')
      if (saved) {
        try {
          const data = JSON.parse(saved)
          user.value = data.user
          loggedInAt.value = new Date(data.loggedInAt)
        } catch (e) {
          console.error('Failed to parse session', e)
        }
      }
    }
  }

  // Initialize immediately on the client side
  if (import.meta.client) {
    init()
  }

  const loggedIn = computed(() => !!user.value)

  return {
    user,
    loggedInAt,
    login,
    logout,
    init,
    loggedIn
  }
})

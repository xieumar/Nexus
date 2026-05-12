import { useLocalSession } from '~/stores/session'

export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side for our local session
  if (import.meta.server) return

  const session = useLocalSession()
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !session.loggedIn) {
    return navigateTo('/login')
  }

  if (!authRequired && session.loggedIn) {
    return navigateTo('/')
  }
})

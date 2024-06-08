import { useAuthStore } from '@/stores/modules/auth-store'
import { MiddlewareContext } from '../model/types'

export const isAuthicatedGuard = async ({ next, nextMiddleware }: MiddlewareContext) => {
  const userStore = useAuthStore()

  if (!userStore.isAuthenticated) {
    const token = userStore.accessToken
    if (token) {
      try {
        console.log(token)
        await userStore.getCurrentUser()
        next('/')
      } catch (error) {
        next()
      }
    } else {
      next()
    }
  } else {
    next('/')
  }

  return nextMiddleware()
}

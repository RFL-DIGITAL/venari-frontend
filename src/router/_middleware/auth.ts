import { useAuthStore } from '@/stores/modules/auth-store'
import { MiddlewareContext } from '../model/types'

export default async function auth({
  from,
  next,
  nextMiddleware,
}: MiddlewareContext) {
  const userStore = useAuthStore()

  if (!userStore.isAuthenticated) {
    const token = userStore.accessToken
    if (token) {
      try {
        await userStore.getCurrentUser()
        return nextMiddleware()
      } catch (error) {
        next(`/auth/login`)
      }
    } else {
      next(`/auth/login`)
    }
  } else {
    nextMiddleware()
  }

  return nextMiddleware()
}

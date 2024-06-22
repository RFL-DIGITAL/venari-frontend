import { useAuthStore } from '@/stores/modules/auth-store'
import { MiddlewareContext } from '../model/types'

export default async function auth({
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
        /* next(`/auth/login`) */
      }
    } else {
      nextMiddleware()
      /* 
        TODO: ВОЗМОЖНО какой-то функционал подмены/ограничения пользователя / флаг ГОСТЬ 
      */
      /* next(`/auth/login`) */
    }
  } else {
    nextMiddleware()
  }

  return nextMiddleware()
}

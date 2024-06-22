import { useAuthStore } from '@/stores/modules/auth-store'
import { MiddlewareContext } from '../model/types'
import { storeToRefs } from 'pinia'

export default async function hr({ nextMiddleware, next }: MiddlewareContext) {
  const { hr } = storeToRefs(useAuthStore())

  console.log(hr.value)

  if (!hr.value) {
    next('/')
  }

  return nextMiddleware()
}

import { useAuthStore } from '@/stores/modules/auth-store'
import { MiddlewareContext } from '../model/types'

export default async function profile({ to, next, nextMiddleware }: MiddlewareContext) {
  const { user } = useAuthStore()
  const { params: { id }, name } = to

  if(user?.id === +id && name !== 'profile-current-user') {
    if(name !== 'profile-edit' && name !== 'profile-resume' && name !== 'profile-resume.create' && name !== 'profile-resume.edit')
        next(`/profile/${id}/me`)

  }

  if(user?.id !== +id && name === 'profile-current-user')
    next(`/profile/${id}/user`)

  return nextMiddleware()
}

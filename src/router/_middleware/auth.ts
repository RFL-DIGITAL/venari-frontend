import { MiddlewareContext } from '../model/types'

export default async function auth ({ nextMiddleware }: MiddlewareContext) {
  /* Получить юзера */

  return nextMiddleware()
}

import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import routes from './routes'
import { middlewarePipeline } from './_middleware/pipeline'
import { MiddlewareResource } from './model/types'


const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  history: createWebHistory(import.meta.env.VITE_API_BASE_URL),
})

router.beforeEach((to, from, next) => {
  if (!to.meta?.middleware) {
    return next()
  }

  const middlewareArray = to.meta.middleware as MiddlewareResource[]
  const middlewareRecord = middlewareArray[0]
  const context = { from, next, to }

  return middlewareRecord.middleware({
    ...context,
    props: middlewareRecord.props ?? {},
    nextMiddleware: middlewarePipeline(context, middlewareArray, 1),
  })
})

export default router


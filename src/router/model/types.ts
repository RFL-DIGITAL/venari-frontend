import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export type MiddlewarePipelineContext = {
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
}

export type MiddlewareContext = MiddlewarePipelineContext & {
  nextMiddleware: ReturnType<MiddlewarePipeline>
  props: MiddlewareProps,
}

export type MiddlewareProps = {
  redirect?: RouteLocationNormalized,
}

export type MiddlewareResource = {
  middleware: (params: MiddlewareContext) => void | Promise<void>,
  props?: MiddlewareProps,
}


export type MiddlewarePipeline = (
  context: MiddlewarePipelineContext,
  middlewaresArray: MiddlewareResource[],
  index: number,
) => NavigationGuardNext | (() => Promise<void>)

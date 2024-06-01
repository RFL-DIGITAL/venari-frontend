import { MiddlewarePipeline } from 'src/router/model/types.js'


const middlewarePipeline: MiddlewarePipeline = (context, middlewareArray, index) => {
  const middlewareRecord = middlewareArray[index]

  if (!middlewareRecord) {
    return context.next
  }

  return async () => {
    const nextPipeline = middlewarePipeline(context, middlewareArray, index + 1)

    await middlewareRecord.middleware({
      ...context,
      props: middlewareRecord.props ?? {},
      nextMiddleware: nextPipeline,
    })
  }
}

export { middlewarePipeline }

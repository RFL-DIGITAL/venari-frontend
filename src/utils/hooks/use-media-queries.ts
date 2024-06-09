// Core
import { onUnmounted } from 'vue'

// Store
import { useMediaQueriesStore } from '@/stores/modules/media-queries.store'

// Utils
import { nanoid } from 'nanoid'


interface Props {
  mediaQuery?: MediaQueryList['media'],
  callback?: (matches: boolean) => void
}

const defaultMediaQuery = '(max-width: 1023px)'

export const useMediaQueries = ({ mediaQuery, callback }: Props = {}) => {
  const uuid = nanoid()
  const { subscribe, unsubscribe } = useMediaQueriesStore()

  const mq = mediaQuery ?? defaultMediaQuery

  const matches = subscribe({ mq, callback, uuid })

  onUnmounted(() => {
    unsubscribe({ mq, uuid })
  })

  return { isMediaQuery: matches }
}

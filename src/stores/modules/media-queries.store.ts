// Core
import { Ref, WatchStopHandle, watch } from 'vue'
import { defineStore } from 'pinia'
import { refDebounced, useMediaQuery } from '@vueuse/core'


export type MediaQueriesCallback = (matches: boolean) => void

interface MediaQueryRecord {
  matches: Ref<boolean>,
  subscriptions: Map<string, MediaQueriesCallback | undefined>,
  watchStopHandle: WatchStopHandle,
}

interface MediaQueriesStoreCreateProps {
  mq: MediaQueryList['media'],
  uuid: string, // subscriber id
  callback?: MediaQueriesCallback,
}

/**
 * @description Общий модуль для отслеживание измнения Media Queries
 */
export const useMediaQueriesStore = defineStore('mediaQueriesStore', () => {

  const watchedMediaQueries: Map<MediaQueryList['media'], MediaQueryRecord> = (new Map())

  const create = ({ mq, uuid, callback }: MediaQueriesStoreCreateProps): Ref<boolean> => {
    const matches = refDebounced(useMediaQuery(mq), 500)

    const watchStopHandle = watch(matches, (value: boolean) => {
      watchCallback(mq, value)
    })

    watchedMediaQueries.set(mq, {
      matches,
      watchStopHandle,
      subscriptions: new Map([[uuid, callback]]),
    })

    return matches
  }

  const subscribe = ({ mq, uuid, callback }: MediaQueriesStoreCreateProps): Ref<boolean> => {
    const mediaQuery = watchedMediaQueries.get(mq)

    if (mediaQuery) {
      mediaQuery.subscriptions.set(uuid, callback)
      return mediaQuery.matches
    } else {
      return create({ mq, uuid, callback })
    }
  }

  const unsubscribe = ({ mq, uuid }: Pick<MediaQueriesStoreCreateProps, 'mq' | 'uuid'>) => {
    const mediaQuery = watchedMediaQueries.get(mq)

    if (mediaQuery) {
      mediaQuery.subscriptions.delete(uuid)

      if (mediaQuery.subscriptions.size === 0) {
        mediaQuery.watchStopHandle()
        watchedMediaQueries.delete(mq)
      }
    }
  }

  const watchCallback = (mq: MediaQueryList['media'], value: boolean) => {
    watchedMediaQueries.get(mq)?.subscriptions.forEach(callback => {
      callback && callback(value)
    })
  }

  return {
    subscribe,
    unsubscribe,
  }
})

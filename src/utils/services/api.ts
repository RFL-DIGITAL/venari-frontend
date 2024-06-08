import snakeCaseKeys from 'snakecase-keys'
import camelCaseKeys from 'camelcase-keys'
import axios from 'axios'
import qs from 'qs'
import { devApiUrl } from './config'
import { ACCESS_TOKEN_KEY } from '@/stores/modules/auth-store'

const requestSearchFieldBuffer: {[key: string]: string } = {}

const createApi = () => {
  const api = axios.create({
    paramsSerializer (params) {
      return qs.stringify(params, {
        arrayFormat: 'indices',
        encode: true,
      })
    },
  })

  api.interceptors.request.use(
    (config) => {
      // В params запросов, для которых не нужно показывать спиннер, надо подкладывать loading: false
      // Если этого поля нет, то спиннер показывается

      config.headers.authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`

      const { url, params } = config
      const search = (params && params.search) || ''

      if (url) {
        requestSearchFieldBuffer[url] = search
      }

      /* config.withCredentials = true */

      if (config.data) {
        config.data = snakeCaseKeys(config.data)
      }

      if (config.params) {
        config.params = snakeCaseKeys(config.params)
      }

      config.baseURL = config.baseURL || devApiUrl

      return config
    },
    (reason) => {
      return Promise.reject(reason)
    }
  )

  api.interceptors.response.use(
    (response) => {
      const { url } = response.config,
        { params } = response.config
      const search = (params && params.search) || ''

      if (response.data) {
        response.data = camelCaseKeys(response.data, { deep: true })
      }

      if (url && requestSearchFieldBuffer[url] !== search) {
        return Promise.reject('late request')
      }

      return response
    },
    (reason) => {
      return Promise.reject(reason)
    }
  )

  return api
}

export { createApi }



import { values } from 'lodash'
import { useRouter } from 'vue-router'

type notifyErrorParamsType = {
  withoutNotFoundRedirect?: boolean
} 

export default function useNotify () {

  const router = useRouter()
  const timeout = 3000
  const position = 'bottom-right'

  const notifyError = (error: any, params?: notifyErrorParamsType) => {
    if (error !== 'late request') {
      /* let message = 'Что-то пошло не так. Повторите попытку позднее или перезагрузите страницу'
      if (error.response && error.response.data) {
        if (error.response.status === 403) {
          Cookies.remove(authTokenName)
          router.replace({ name: 'forbidden' })
        }
        else if (error.response.status === 404 && !params?.withoutNotFoundRedirect) {
          router.replace({ name: 'not-found' })
        }
        else if (error.response.status === 422) {
          if (error.response.data.errors) {
            message = values(error.response.data.errors).map((field: string[]) => field[0]).join('<br/>')
          } else {
            message = error.response.data.message
          }
        } else {
          message = error.response.data.message
        }
      } else if (typeof error === 'string') {
        message = error
      } else if (typeof error === 'boolean') {
        return
      } */

      /* TODO: ДОБАВИТЬ ОБРАБОТКУ ОШИБОК */
      console.log(error)
    }
  }

  return {
    notifyError,
  }
}


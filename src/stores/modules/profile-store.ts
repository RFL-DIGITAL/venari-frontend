import { defineStore } from 'pinia'
import {
  Vacancy,
  PaginatedList,
  PostsGetRequestParams,
  getVacanciesRequest,
  getVacancyRequest,
  User,
  getUserById,
} from '../types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useProfileStore = defineStore('profileStore', () => {
  const user = ref<User | null>()

  const getUser = async (userId: number) => {
    const { data } = await getUserById(userId)
    user.value = data.response[0]
  }

  return {
    user,
    getUser
  }
})

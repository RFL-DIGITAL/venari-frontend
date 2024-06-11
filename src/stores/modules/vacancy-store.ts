import { defineStore } from 'pinia'
import { Vacancy, PaginatedList, PostsGetRequestParams, getVacanciesRequest, getVacancyRequest } from '../types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useVacancyStore = defineStore('vacancyStore', () => {
  const paginatedPosts = ref<PaginatedList<Vacancy> | null>(null)

  const vacancies = computed<Vacancy[]>(() => (paginatedPosts.value?.data ?? []) as Vacancy[])
  const paginator = computed(() => paginatedPosts.value ? getPaginator<PaginatedList<Vacancy>>(paginatedPosts.value) : null)

  const filter = ref<PostsGetRequestParams>({
    page: 1,
    perPage: 10,
  })

  const vacancy = ref<Vacancy | null>(null)

  const getVacancies = async () => {
    const { data } = await getVacanciesRequest(filter.value)

    paginatedPosts.value = {
        ...data.response,
        data: [...vacancies.value, ...data.response.data]
    }
  }

  const getVacancy = async (vacancyId: number) => {
    const { data } = await getVacancyRequest(vacancyId)

    vacancy.value = data.response
  }

  return {
    vacancies,
    paginator,
    filter,
    vacancy,
    getVacancies,
    getVacancy,
  }
})

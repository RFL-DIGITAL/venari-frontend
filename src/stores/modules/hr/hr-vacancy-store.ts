import { defineStore } from 'pinia'
import { HrVacancy, PaginatedList, HrVacancyGetRequestParams, getHrVacanciesRequest } from '@/stores/types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useHrVacancyStore = defineStore('hrVacancyStore', () => {
  const paginated = ref<PaginatedList<HrVacancy> | null>(null)

  const vacancies = computed<HrVacancy[]>(() => (paginated.value?.data ?? []) as HrVacancy[])
  const paginator = computed(() => paginated.value ? getPaginator<PaginatedList<HrVacancy>>(paginated.value) : null)

  const filter = ref<HrVacancyGetRequestParams>({
    page: 1,
    perPage: 10,
  })

  const getVacancies = async () => {
    const { data } = await getHrVacanciesRequest(filter.value)

    paginated.value = {
        ...data.response,
        data: [...vacancies.value, ...data.response.data]
    }
  }

  return {
    vacancies,
    paginator,
    filter,
    getVacancies,
  }
})

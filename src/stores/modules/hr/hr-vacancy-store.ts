import { defineStore } from 'pinia'
import { HrVacancy, PaginatedList, HrVacancyGetRequestParams, getHrVacanciesRequest, CreateVacancyRequest, postHrVacancyRequest, putHrVacancyRequest, ArchiveVacancyBodyRequest, postArchiveVacancyRequest, postUnarchiveVacancyRequest } from '@/stores/types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useHrVacancyStore = defineStore('hrVacancyStore', () => {
  const paginated = ref<PaginatedList<HrVacancy> | null>(null)

  const vacancies = computed<HrVacancy[]>(() => (paginated.value?.data ?? []) as HrVacancy[])
  const paginator = computed(() => paginated.value ? getPaginator<PaginatedList<HrVacancy>>(paginated.value) : null)

  const filter = ref<HrVacancyGetRequestParams>({
    page: 1,
    perPage: 10,
    statusId: 1,
  })

  const getVacancies = async () => {
    const { data } = await getHrVacanciesRequest(filter.value)

    if(filter.value.page > 1)
      paginated.value = {
          ...data.response,
          data: [...vacancies.value, ...data.response.data]
      }
    else
      paginated.value = data.response
  }

  const postVacancy = async(_data: CreateVacancyRequest) => {
    const { data } = await postHrVacancyRequest(_data)
    return data
  }

  const putVacancy = async(_data: CreateVacancyRequest) => {
    const { data } = await putHrVacancyRequest(_data)
    return data
  }

  const postArchiveVacancy = async(_data: ArchiveVacancyBodyRequest) => {
    const { data } = await postArchiveVacancyRequest(_data)
    return data
  }

  const postUnarchiveVacancy = async(_data: ArchiveVacancyBodyRequest) => {
    const { data } = await postUnarchiveVacancyRequest(_data)
    return data
  }

  return {
    vacancies,
    paginator,
    filter,
    getVacancies,
    postVacancy,
    putVacancy,
    postArchiveVacancy,
    postUnarchiveVacancy,
  }
})

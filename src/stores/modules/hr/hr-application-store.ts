import { defineStore } from 'pinia'
import {
  PaginatedList,
  ApplicationShort,
  postChangeApplicationsStage,
  PostShareApplicationsBodyRequest,
  postShareApplications,
  getHrApplicationListRequest,
  HrApplicationGetRequestParams,
  PostChangeApplicationsStageRequest,
  getHrApplicationRequest,
  Application,
} from '@/stores/types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useHrApplicationStore = defineStore('hrApplicationStore', () => {
  const paginated = ref<PaginatedList<ApplicationShort> | null>(null)

  const applications = computed<ApplicationShort[]>(
    () => (paginated.value?.data ?? []) as ApplicationShort[],
  )

  const application = ref<Application | null>(null)

  const paginator = computed(() =>
    paginated.value ? getPaginator<PaginatedList<ApplicationShort>>(paginated.value) : null,
  )

  const filter = ref<HrApplicationGetRequestParams>({
    page: 1,
    perPage: 15,
  })

  const getApplications = async (added = true) => {
    const { data } = await getHrApplicationListRequest(filter.value)

    if (filter.value.page > 1 && added)
      paginated.value = {
        ...data.response,
        data: [...applications.value, ...data.response.data],
      }
    else paginated.value = data.response
  }

  const getApplication = async (applicationid: number) => {
    const { data } = await getHrApplicationRequest(applicationid)

    application.value = data.response
  }

  const changeApplicationsStage = async (_body: PostChangeApplicationsStageRequest) => {
    const { data } = await postChangeApplicationsStage(_body)
  }

  const shareApplications = async (_body: PostShareApplicationsBodyRequest) => {
    const { data } = await postShareApplications(_body)

    return data.response
  }

  return {
    applications,
    paginator,
    filter,
    application,
    getApplication,
    getApplications,
    changeApplicationsStage,
    shareApplications,
  }
})

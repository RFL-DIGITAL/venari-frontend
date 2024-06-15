import { defineStore } from 'pinia'
import {
  PaginatedList,
  getCandidatesRequest,
  User,
  HrCandidatesGetRequestParams,
} from '@/stores/types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useHrCandidateStore = defineStore('hrCandidateStore', () => {
  const paginated = ref<PaginatedList<User> | null>(null)

  const candidates = computed<User[]>(
    () => (paginated.value?.data ?? []) as User[],
  )
  const paginator = computed(() =>
    paginated.value ? getPaginator<PaginatedList<User>>(paginated.value) : null,
  )

  const filter = ref<HrCandidatesGetRequestParams>({
    page: 1,
    perPage: 10,
  })

  const getCandidates = async () => {
    const { data } = await getCandidatesRequest(filter.value)

    if (filter.value.page > 1)
      paginated.value = {
        ...data.response,
        data: [...candidates.value, ...data.response.data],
      }
    else paginated.value = data.response
  }

  /* const postCandidate = async (_data: CreateCandidateRequest) => {
    const { data } = await postHrCandidateRequest(_data)
    return data
  }
 */
  return {
    candidates,
    paginator,
    filter,
    getCandidates,
  }
})

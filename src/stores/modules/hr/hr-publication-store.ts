import { defineStore } from 'pinia'
import { HrPublicationsGetRequestParams, PaginatedList, Post} from '@/stores/types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useHrPublicationStore = defineStore('hrPublicationStore', () => {
  const paginated = ref<PaginatedList<Post> | null>(null)

  const publications = computed<Post[]>(() => (paginated.value?.data ?? []) as Post[])
  const paginator = computed(() =>
    paginated.value ? getPaginator<PaginatedList<Post>>(paginated.value) : null,
  )

  const filter = ref<HrPublicationsGetRequestParams>({
    page: 1,
    perPage: 10,
  })

  const getPublications = async () => {
    /* const { data } = await getpublicationsRequest(filter.value)

    if (filter.value.page > 1)
      paginated.value = {
        ...data.response,
        data: [...publications.value, ...data.response.data],
      }
    else paginated.value = data.response */
  }

  return {
    publications,
    paginator,
    filter,
    getPublications,
  }
})

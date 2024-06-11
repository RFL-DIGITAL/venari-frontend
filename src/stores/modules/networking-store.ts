import { defineStore } from 'pinia'
import { Networking, PaginatedList, PostsGetRequestParams, getNetworkingRequest, getNetworkingsRequest } from '../types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useNetworkingStore = defineStore('networkingStore', () => {
  const paginatedPosts = ref<PaginatedList<Networking> | null>(null)

  const networkings = computed<Networking[]>(() => (paginatedPosts.value?.data ?? []) as Networking[])
  const paginator = computed(() => paginatedPosts.value ? getPaginator<PaginatedList<Networking>>(paginatedPosts.value) : null)

  const filter = ref<PostsGetRequestParams>({
    page: 1,
    perPage: 10,
  })

  const networking = ref<Networking | null>(null)

  const getNetworkings = async () => {
    const { data } = await getNetworkingsRequest(filter.value)

    paginatedPosts.value = {
        ...data.response,
        data: [...networkings.value, ...data.response.data]
    }
  }

  const getNetworking = async (vacancyId: number) => {
    const { data } = await getNetworkingRequest(vacancyId)

    networking.value = data.response
  }

  return {
    networkings,
    paginator,
    filter,
    networking,
    getNetworkings,
    getNetworking,
  }
})

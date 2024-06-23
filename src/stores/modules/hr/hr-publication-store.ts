import { defineStore } from 'pinia'
import { getPostsRequest, Post, PaginatedList, PostsGetRequestParams } from '@/stores/types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useHrPublicationStore = defineStore('hrPublicationStore', () => {
  const paginatedPosts = ref<PaginatedList<Post> | null>(null)

  const posts = computed<Post[]>(() => (paginatedPosts.value?.data ?? []) as Post[])
  const paginator = computed(() => paginatedPosts.value ? getPaginator<PaginatedList<Post>>(paginatedPosts.value) : null)

  const filter = ref<PostsGetRequestParams>({
    page: 1,
    perPage: 10,
    forceOuter: true,
  })

  const getPosts = async () => {
    const { data } = await getPostsRequest(filter.value)

    paginatedPosts.value = {
        ...data.response,
        data: [...posts.value, ...data.response.data]
    }
  }

  return {
    posts,
    paginator,
    filter,
    getPosts,
  }

  return {
    posts,
    paginator,
    filter,
    getPosts,
  }
})

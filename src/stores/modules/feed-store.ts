import { defineStore } from 'pinia'
import { getPostsRequest, Post, PostPaginatedList, PostsGetRequestParams } from '../types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useFeedStore = defineStore('feedStore', () => {
  const paginatedPosts = ref<PostPaginatedList | null>(null)

  const posts = computed<Post[]>(() => (paginatedPosts.value?.data ?? []) as Post[])
  const paginator = computed(() => paginatedPosts.value ? getPaginator<PostPaginatedList>(paginatedPosts.value) : null)

  const filter = ref<PostsGetRequestParams>({
    page: 1,
    perPage: 10,
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
})

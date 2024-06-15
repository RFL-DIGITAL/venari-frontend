import { defineStore } from 'pinia'
import {
  PaginatedList,
  PostsGetRequestParams,
  User,
  getUserById,
  Post,
  getPostsByIdRequest,
} from '../types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const useProfileStore = defineStore('profileStore', () => {
  const user = ref<User | null>()

  const paginatedPosts = ref<PaginatedList<Post> | null>(null)

  const posts = computed<Post[]>(() => (paginatedPosts.value?.data ?? []) as Post[])
  const paginator = computed(() => paginatedPosts.value ? getPaginator<PaginatedList<Post>>(paginatedPosts.value) : null)

  const filter = ref<PostsGetRequestParams>({
    page: 1,
    perPage: 10,
  })

  const getUser = async (userId: number) => {
    const { data } = await getUserById(userId)
    user.value = data.response
  }

  const getPosts = async (userId: number) => {
    const { data } = await getPostsByIdRequest(userId)

    paginatedPosts.value = {
        ...data.response,
        data: [...posts.value, ...data.response.data]
    }
  }

  return {
    user,
    paginator,
    filter,
    posts,
    getUser,
    getPosts,
  }
})

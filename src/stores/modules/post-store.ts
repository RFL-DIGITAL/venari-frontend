import { defineStore } from 'pinia'
import {
  CommentPaginatedList,
  getPostRequest,
  Post,
  Comment,
  CommentsGetRequestParams,
  postCommentRequest,
  CommemtPostRequest,
  getCommentsRequest,
} from '../types/schema'
import { computed, ref } from 'vue'
import { getPaginator } from '@/utils/functions/get-paginator'

export const usePostStore = defineStore('postStore', () => {
  const post = ref<Post | null>(null)

  const paginatedComments = ref<CommentPaginatedList | null>(null)

  const comments = computed<Comment[]>(
    () => (paginatedComments.value?.data ?? []) as Comment[],
  )

  const paginatorComments = computed(() =>
    paginatedComments.value
      ? getPaginator<CommentPaginatedList>(paginatedComments.value)
      : null,
  )

  const filterComments = ref<CommentsGetRequestParams>({
    page: 1,
    perPage: 100,
  })

  const getPost = async (postId: number) => {
    const { data } = await getPostRequest(postId)

    post.value = data.response
  }

  const getComments = async (postId: number) => {
    const { data } = await getCommentsRequest(postId, filterComments.value)

    paginatedComments.value = {
      ...data.response,
      data: [...comments.value, ...data.response.data],
    }
  }

  const postComment = async (body: CommemtPostRequest) => {
    const { data } = await postCommentRequest(body)

    /* getComments(post.value!.id) */
    console.log(data)
  }

  /* TODO ЛАЙК, КОММЕНТ */

  return {
    post,
    getPost,
    getComments,
    comments,
    paginatorComments,
    filterComments,
    postComment,
  }
})

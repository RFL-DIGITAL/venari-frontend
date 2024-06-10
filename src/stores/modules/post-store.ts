import { defineStore } from 'pinia'
import { getPostRequest, Post } from '../types/schema'
import { ref } from 'vue'

export const usePostStore = defineStore('postStore', () => {
  const post = ref<Post | null>(null)

  const getPost = async (postId: number) => {
    const { data } = await getPostRequest(postId)

    post.value = data.response
  }

  /* TODO ЛАЙК, КОММЕНТ */

  return {
    post,
    getPost,
  }
})

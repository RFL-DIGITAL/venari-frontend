<template>
  <Post v-if="post" :post="post" @update:comment="handlePostComment" />
</template>

<script setup lang="ts">
  // Core
  import { useRoute } from 'vue-router'
  import { watch } from 'vue'
  import { storeToRefs } from 'pinia'

  // Hooks
  import useNotify from '@/utils/hooks/useNotify'
  import { isEqual } from 'lodash'

  // Store
  import { usePostStore } from '@/stores/modules/post-store'

  const { getPost, getComments, postComment } = usePostStore()
  const { post, comments } = storeToRefs(usePostStore())
  const { notifyError } = useNotify()

  const $route = useRoute()

  fetchData()
  async function fetchData() {
    await Promise.all([
      getPost(+$route.params.id),
      getComments(+$route.params.id),
    ]).catch(notifyError)
    post.value.comments = comments.value
  }

  async function handlePostComment(text: string) {
    await postComment({
      text,
      postId: +$route.params.id,
      parentId: null,
    })
  }

  watch(
    () => comments.value,
    () => {
      if (post.value && comments.value.length)
        post.value.comments = comments.value
    },
    { deep: true },
  )

  watch(
    () => $route.params,
    (oldId, newId) => {
      if (!isEqual(oldId, newId)) fetchData()
    },
  )
</script>

<style scoped></style>

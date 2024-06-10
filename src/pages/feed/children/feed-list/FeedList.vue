<template>
  <PostList
    v-if="posts.length"
    :items="posts"
    :paginator="paginator"
    v-model:filter="filter"
  />
</template>

<script setup lang="ts">
  import { useFeedStore } from '@/stores/modules/feed-store'
  import { storeToRefs } from 'pinia'
  import { watch } from 'vue'

  const { paginator, posts, filter } = storeToRefs(useFeedStore())
  const { getPosts } = useFeedStore()

  fetchData()

  function fetchData() {
    getPosts()
  }

  watch(
    () => filter.value,
    () => {
      fetchData()
    },
    { deep: true },
  )
</script>

<style scoped></style>

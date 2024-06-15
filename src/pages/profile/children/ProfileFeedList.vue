<template>
  <PageTitle v-if="posts.length" class="sm:block hidden mt-[25px]" title="Публикации" />  

  <PostList
    v-if="posts.length"
    :items="posts"
    :paginator="paginator"
    v-model:filter="filter"
  />
</template>

<script setup lang="ts">
  import { useProfileStore } from '@/stores/modules/profile-store'
  import { storeToRefs } from 'pinia'
  import { watch } from 'vue'
  import { useRoute } from 'vue-router'

  const $route = useRoute()

  const { paginator, posts, filter } = storeToRefs(useProfileStore())
  const { getPosts } = useProfileStore()

  fetchData()

  function fetchData() {
    getPosts(+$route.params.id)
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

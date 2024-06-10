<template>
  <Post v-if="post" :post="post" />
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

  const { getPost } = usePostStore()
  const { post } = storeToRefs(usePostStore())
  const { notifyError } = useNotify()

  const $route = useRoute()

  fetchData()
  function fetchData() {
    getPost(+$route.params.id).catch(notifyError)
  }

  watch(
    () => $route.params,
    (oldId, newId) => {
      if (!isEqual(oldId, newId)) fetchData()
    },
  )
</script>

<style scoped></style>

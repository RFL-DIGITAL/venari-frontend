<template>
  <BaseInterceptor
    @intersect="handleIntersect"
  >
    <div class="flex flex-col sm:gap-y-[25px]">
      <Post v-for="post in items" :key="post.id" preview :post="post" />
    </div>
  </BaseInterceptor>
</template>

<script setup lang="ts">
  import type { Paginator, Post, PostsGetRequestParams } from '@/stores/types/schema'
  import { computed } from 'vue'

  interface Props {
    items: Post[]
    paginator: Paginator
    filter: PostsGetRequestParams
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:filter', filter: PostsGetRequestParams): void
  }>()

  const _filter = computed({
    get() {
      return props.filter
    },
    set(value: PostsGetRequestParams) {
      $emit('update:filter', value)
    },
  })

  function handleIntersect() {
    if(_filter.value.page + 1 <= props.paginator?.lastPage)
      _filter.value = { ..._filter.value, page: _filter.value.page + 1 }
  }
</script>

<!-- TODO: Нужен Post -->
<template>
  <div class="post max-w-[1400px]">
    <PostHeader v-bind="{ ...$props }" />

    <PostContent v-bind="{ ...$props }" />

    <PostFooter
      v-bind="{ ...$props }"
      @update:comment="(val: string) => $emit('update:comment', val)"
    />
  </div>
</template>

<script setup lang="ts">
  import { Post } from '@/stores/types/schema'
  import { ref } from 'vue'

  export interface PostProps {
    post: Post
    preview: boolean
  }

  defineProps<PostProps>()

  const $emit = defineEmits<{
    (e: 'update:comment', value: string): void
    (e: 'reply', value: number): void
  }>()
</script>

<style scoped lang="scss">
  .post {
    @apply flex flex-col w-full bg-white sm:px-[22px] px-[15px] sm:py-[29px] py-[20px] sm:rounded-[15px] sm:gap-y-[20px] gap-y-[15px];
  }

  .text-hidden {
    @include text-truncate(7);
  }

  :deep(.base-input) {
    width: 100%;
    justify-self: flex-end;

    .base-input__input {
      width: calc(100% - 20px);
    }
  }
</style>

<!-- TODO: Нужен Post -->
<template>
  <div class="post max-w-[1400px]">
    <PostHeader v-bind="{ ...$props }" />

    <!-- <PostContent v-bind="{ ...$props }" /> -->

    <PostFooter v-bind="{ ...$props }" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface Post {
    image: string
    text: string
    title: string
    likes: number
    comments: {
      count: number
      comment: any
    }
  }

  export interface PostProps {
    post: Post
    preview: boolean
  }

  withDefaults(defineProps<PostProps>(), {
    post: {
      image: '124124',
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. adipiscing elit.adipiscing elit.adipiscin...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. adipiscing elit.adipiscing elit.adipiscin...',
      likes: 123,
      comments: {
        count: 12,
        comment: ['1233', '124124'],
      },
    },
  })

  const textHidden = ref(true)
</script>

<style scoped lang="scss">
  .post {
    @apply flex flex-col w-full bg-white px-[22px] py-[29px] rounded-[15px] gap-y-[20px];
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

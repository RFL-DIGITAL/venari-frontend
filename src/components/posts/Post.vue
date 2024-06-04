<!-- TODO: Нужен Post -->
<template>
  <div class="post max-w-[1400px]">
    <div class="flex justify-between">
      <UserCard />
      <p class="text-gray">10 часов назад</p>
    </div>
    <div v-if="post.image || true" class="max-h-[600px] min-h-[450px] h-full">
      <BaseSwiper />
    </div>
    <div v-if="post.text">{{ post.text }}</div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-[42px]">
        <ButtonLike />
        <ButtonComment />
        <ButtonShare />
      </div>

      <Button plain text label="Читать далее" />
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Post {
    image: string
    text: string
    likes: number
    comments: {
      count: number
      comment: any
    }
  }

  interface PostProps {
    post: Post
  }

  withDefaults(defineProps<PostProps>(), {
    post: {
      image: '124124',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. adipiscing elit.adipiscing elit.adipiscin...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. adipiscing elit.adipiscing elit.adipiscin...',
      likes: 123,
      comments: {
        count: 12,
        comment: ['1233', '124124'],
      },
    },
  })
</script>

<style scoped>
  .post {
    @apply flex flex-col w-full bg-white px-[22px] py-[29px] rounded-[15px] gap-y-[20px];
  }
</style>

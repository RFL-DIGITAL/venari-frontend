<!-- TODO: Нужен Post -->
<template>
  <div class="post max-w-[1400px]">
    <div class="flex justify-between">
      <UserCard />
      <p class="text-gray text-base">10 часов назад</p>
    </div>

    <div v-if="post.title" class="text-lg">
      {{ post.title }}
    </div>

    <div v-if="post.text" class="text-hidden text-base">
      {{ post.text }}
    </div>

    <div v-if="post.image || true" class="max-h-[600px] min-h-[450px] h-full">
      <BaseSwiper />
    </div>

    <div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-[42px]">
          <ButtonLike />
          <ButtonComment />
          <ButtonShare />
        </div>

        <RouterLink :to="{name: 'feed-article', params: { id: 1 }}">
          <SecondButton label="Читать материал" leftIcon="article"/>
        </RouterLink>

        <!-- <Button
          plain
          text
          :label="textHidden ? 'Читать далее' : 'Скрыть'"
          @click="textHidden = !textHidden"
        /> -->
      </div>

      <CommentTree v-if="!preview" />
    </div>
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

  interface PostProps {
    post: Post
    preview: boolean
  }

  withDefaults(defineProps<PostProps>(), {
    post: {
      image: '124124',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
</style>

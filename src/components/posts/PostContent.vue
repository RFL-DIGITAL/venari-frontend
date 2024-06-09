<template>
  <div v-if="post.title" class="sm:text-lg text-title-small">
    {{ post.title }}
  </div>

  <div v-if="post.text" class="text-hidden sm:text-base text-xs">
    {{ post.text }}
  </div>

  <div v-if="post.image || true" class="post-content__swiper-container">
    <BaseSwiper />
  </div>
</template>

<script setup lang="ts">
  import { PostProps } from './Post.vue'

  defineProps<PostProps>()
</script>

<style scoped lang="scss">
.post-content__swiper-container {
  @apply sm:max-h-[600px] sm:h-full;

  @media (max-width: 1023px) {
    width: calc(100vw - 30px);
    max-width: calc(874px - 30px);
  }
}
</style>

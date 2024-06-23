<template>
  <template v-if="preview">
    <div v-if="post.title" class="sm:text-lg text-title-small text-break">
      {{ post.title }}
    </div>
  
    <div v-if="post.text" class="text-hidden sm:text-base text-xs text-break" :class="{'text-truncate-4': preview}">
      {{ post.text }}
    </div>
  
    <div v-if="post.images?.length" class="post-content__swiper-container">
      <BaseSwiper :slides="post.images"/>
    </div>
  </template>

  <template v-else>
    <template v-for="part in post.parts">
      
    </template>

  </template>

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

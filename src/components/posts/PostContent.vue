<template>
  <div v-if="post.title" class="text-lg">
    {{ post.title }}
  </div>

  <div v-if="post.text" class="text-hidden text-base">
    {{ post.text }}
  </div>

  <div v-if="post.image || true" class="max-h-[600px] min-h-[450px] h-full">
    <BaseSwiper />
  </div>
</template>

<script setup lang="ts">
  import { PostProps } from './Post.vue'

  defineProps<PostProps>()
</script>

<style scoped></style>

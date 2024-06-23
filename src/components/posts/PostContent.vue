<template>
  <template v-if="preview">
    <div v-if="post.title" class="sm:text-lg text-title-small text-break">
      {{ post.title }}
    </div>

    <div v-if="post.text" class="text-hidden sm:text-base text-xs text-break" :class="{ 'text-truncate-4': preview }">
      {{ post.text }}
    </div>

    <div v-if="post.images?.length" class="post-content__swiper-container">
      <BaseSwiper :slides="post.images" />
    </div>
  </template>

  <template v-else>
    <template v-for="part in post.parts">
      <template v-if="part.contentType.includes('Title')">
        <div v-if="part.content.name" class="sm:text-lg text-title-small text-break !font-bold" v-html="part.content.name"/>
      </template>

      <template v-if="part.contentType.includes('Heading')">
        <div v-if="part.content?.name" class="sm:text-base text-xs text-break" v-html="part.content?.name" />
      </template>

      <template v-else-if="part.contentType.includes('Text')">
        <div v-if="part.content?.name" class="text-hidden sm:text-sm text-xs text-break"
          v-html="part.content?.name" />
      </template>

      <template v-else-if="part.contentType.includes('ImageBlock')">
        <div v-if="part.images?.length" class="post-content__swiper-container">
          <BaseSwiper :slides="part.images" />
        </div>
      </template>

    </template>
  </template>

</template>

<script setup lang="ts">
import { PostProps } from './Post.vue'

defineProps<PostProps>()
</script>

<style lang="scss">
.post-content__swiper-container {
  @apply sm:max-h-[600px] sm:h-full;

  @media (max-width: 1023px) {
    width: calc(100vw - 30px);
    max-width: calc(874px - 30px);
  }
}

.post-content {
  &__title {
    @apply sm:text-lg text-title-small text-break font-bold;

    * {
      color: green;
    }
  }
}

.post-content__swiper-container {
  @apply text-blue;
}
</style>

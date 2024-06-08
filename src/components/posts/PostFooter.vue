<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-[22px]">
        <ButtonLike />
        <ButtonComment />
        <ButtonShare />
      </div>

      <RouterLink
        :to="{ name: 'feed-article', params: { id: 1 } }"
        v-if="preview"
      >
        <SecondButton label="Читать материал" leftIcon="outlined2/article" />
      </RouterLink>

      <BaseInput
        v-else
        iconPosition="right"
        icon="outlined/arrow-bottom"
        label="Оставить комментарий"
        :icon-size="30"
      />
    </div>

    <CommentTree v-if="!preview" />
  </div>
</template>

<script setup lang="ts">
  import { PostProps } from './Post.vue'

  defineProps<PostProps>()
</script>

<style scoped></style>

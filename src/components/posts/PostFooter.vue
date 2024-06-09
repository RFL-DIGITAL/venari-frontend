<template>
  <div>
    <div class="flex sm:flex-row flex-col sm:items-center justify-between gap-y-[20px]">
      <div class="flex items-center gap-x-[22px]">
        <ButtonLike />
        <ButtonComment />
        <ButtonShare />
      </div>

      <RouterLink
        :to="{ name: 'feed-article', params: { id: 1 } }"
        v-if="preview"
      >
        <SecondButton label="Читать материал" leftIcon="icon-[outlined/article]" />
      </RouterLink>

      <BaseInput
        v-else
        v-model="comment"
        iconPosition="right"
        icon="icon-[outlined/arrow-bottom]"
        label="Оставить комментарий"
        icon-active
        :icon-size="26"
        @enter="handleSendComment"
      />
    </div>

    <CommentTree class="mt-[24px]" v-if="!preview" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { PostProps } from './Post.vue'

  defineProps<PostProps>()
  
  const comment = ref()

  function handleSendComment() {
    console.log(comment.value)
  }
</script>

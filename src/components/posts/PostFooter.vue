<template>
  <div>
    <div
      class="flex sm:flex-nowrap flex-wrap items-center justify-between sm:gap-x-[40px] gap-x-[20px] gap-y-[20px]"
    >
      <div class="flex items-center gap-x-[22px]">
        <ButtonLike :label="post.likes" />
        <RouterLink :to="{ name: 'feed-article', params: { id: post.id } }">
          <ButtonComment :label="post.commentCount" />
        </RouterLink>

        <ButtonShare />
      </div>

      <RouterLink
        :to="{ name: 'feed-article', params: { id: post.id } }"
        v-if="preview"
      >
        <SecondButton
          label="Читать материал"
          leftIcon="icon-[outlined/article]"
        />
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

    <CommentTree
      class="mt-[24px]"
      :comments="post.comments"
      v-if="!preview && post.comments?.length"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { PostProps } from './Post.vue'

  defineProps<PostProps>()

  const comment = ref('')

  const $emit = defineEmits<{
    (e: 'update:comment', value: string): void
    (e: 'reply', value: number): void
  }>()

  function handleSendComment() {
    $emit('update:comment', comment.value)
    comment.value = ''
  }
</script>

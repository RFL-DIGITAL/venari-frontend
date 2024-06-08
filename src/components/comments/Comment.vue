<template>
  <Message show-avatar :message="{...comment }" ref="commentComponent"/>

  <template v-if="comment?.comments?.length">
    <!-- v-if="commentComponent?.$el?.offsetWidth + 50 > 0" -->
    <div
      :class="(commentIndex + 1) < inListLength ? 'border-l-2 border-light-gray w-[16px] mx-auto' : ''"
    />
      
    <div class="flex flex-col min-w-[400px] ml-auto" :style="`max-width: ${commentComponent?.$el?.offsetWidth}px`">
      <template v-for="(_comment, index) in comment.comments" :key="_comment.id">
        <div class="grid" :style="`grid-template-columns: 50px min(calc(100% - 50px), ${commentComponent?.$el?.offsetWidth - 50}px);`">
          <CommentBranch :last="index === comment.comments.length - 1"/>
          <Comment 
            :comment="_comment"
            :comment-index="index"
            :inListLength="comment.comments.length"
          />
        </div>
      </template>
    </div>

  </template>
</template>

<script setup lang="ts">
  // Core
  import { onMounted, onUnmounted, ref } from 'vue';

  // Types
  import type { Message } from '@/components/common/Message.vue'

  // Components
  import MessageComponent from '@/components/common/Message.vue'
  
  interface Comment extends Message {
    comments: Comment[]
  }
    
  interface Props {
    comment: Comment
    commentIndex: number
    inListLength: number
  }
      
  defineProps<Props>()
  
  const commentComponent = ref<InstanceType<typeof MessageComponent> | null>(null)
  const commentComponentWidth = ref(commentComponent.value?.$el?.offsetWidth)

  function setParentWidth() {
    commentComponentWidth.value = commentComponent.value?.$el?.offsetWidth
  }

  onMounted(() => {
    document.addEventListener('resize', setParentWidth)
  })

  onUnmounted(() => {
    document.removeEventListener('resize', setParentWidth)
  })
</script>

<style scoped>

</style>

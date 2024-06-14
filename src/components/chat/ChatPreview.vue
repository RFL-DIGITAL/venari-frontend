<template>
  <div class="chat-preview">
      <div class="flex flex-row justify-around gap-1">
        <Button v-for="i in filter" :key="i.type" :label="i.title" severity="secondary" outlined />
    </div>
    <ChatPreviewCard v-for="i in chats" :key="i" :data="i" />

  </div>
    
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import ChatPreview from './types'
  import ScrollPanel from 'primevue/scrollpanel'
  interface ChatPreviewProps {
    chats: Array<ChatPreview>
  }

  defineProps<ChatPreviewProps>()

  const filter = ref([
    { title: 'Все', type: 'all', icon: '' },
    { title: 'Вакансии', type: 'vacancy', icon: '' },
    { title: 'Люди', type: 'message', icon: '' },
    { title: 'Группы', type: 'chatMessage', icon: '' },
  ])
</script>

<script lang="ts">
  onMounted(() => {
    console.log()
  })

</script>

<style scoped lang="scss">
  .chat-preview {
    @apply flex flex-col gap-y-[15px];
    @apply min-h-min max-h-[80vh] overflow-y-auto;
    scrollbar-base-color: transparent;
    scrollbar-width: none;
  }


  :deep(.p-scrollpanel-bar) {
    @apply rounded;
    background: var(--extra-light-gray);
    opacity: 1;
    outline: none;
    outline-offset: 0;
  }

  :deep(.p-scrollpanel-wrapper) {
    @apply border-r-[15px] border-white;
  }
  .chat-window__scroll-panel {
    @apply h-[80%];
  }
  .p-scrollpanel-content { 
    padding: 28px 18px 18px 0;
  }
</style>

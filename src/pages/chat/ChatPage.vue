<!-- TODO: Жду шрифты -->
<template>
  <div class="chat-page">
    <div class="chat-page__sidebar">
      <div
        class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]"
      >
        <ChatPreview />
      </div>
    </div>

    <div class="chat-page__container">
      <router-view />
      <p v-if="$route.name === 'chats'">Выберите чат</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const $route = useRoute()
</script>

<style scoped lang="scss">
  .chat-page {
    @apply w-full h-full grid gap-x-[25px];
    grid-template-columns: 1fr 2fr;

    &__container {
      @apply flex flex-col w-full h-full bg-white p-[35px] rounded-[15px] h-[85vh];
    }
  }
</style>

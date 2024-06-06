<!-- TODO: Жду шрифты -->
<template>
  <div class="feed-page">
    <div class="feed-page__posts-container">
      <div class="text-page-title">Главное за 24 часа</div>
      <Post/>
    </div>

    <div class="feed-page__sidebar">
      <div class="text-page-title">Чаты</div>

      <div class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]">
        <ChatPreview/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
  .feed-page {
    @apply w-full h-full grid gap-x-[25px];
    grid-template-columns: 2fr 1fr;
    padding-bottom: 10vh;
  }
</style>

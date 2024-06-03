<!-- TODO: Жду шрифты -->
<template>
  <div class="feed-page">
    <div class="feed-page__posts-container">
      <div class="text-h-m !font-bold mb-[30px]">Главное за 24 часа</div>
      <Post/>
    </div>

    <div class="feed-page__sidebar">
      <div class="text-h-m !font-bold mb-[30px]">Чаты</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .feed-page {
    @apply w-full h-full grid gap-x-[25px];
    grid-template-columns: 2fr 1fr;
  }
</style>

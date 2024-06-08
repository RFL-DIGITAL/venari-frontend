<!-- TODO: Жду шрифты -->
<template>
  <div class="feed-page">
    <div class="feed-page__posts-container">
      <RouterView />
    </div>

    <FeedSidebar/>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .feed-page {
    @include page-container-main-left;
    padding-bottom: 10vh;

    & > *:nth-child(1) {
      max-width: 874px;
    }
  }
</style>

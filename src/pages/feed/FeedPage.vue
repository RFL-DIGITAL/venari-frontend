<!-- TODO: Жду шрифты -->
<template>
  <AppMobileHeader/>
  <div class="feed-page">
    <div class="feed-page__posts-container place-self-center">
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

    & > *:nth-child(1) {
      max-width: 874px;
    }
  }
</style>

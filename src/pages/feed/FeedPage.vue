<!-- TODO: Жду шрифты -->
<template>
  <div class="feed-page">
    <div class="feed-page__posts-container">
      <Post/>
    </div>

    <div class="feed-page__sidebar">
      <PageNavigation label="Чаты" :to="{ name: 'chats' }"/>

      <div class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]">
        <ChatPreview/>
      </div>
    </div>
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

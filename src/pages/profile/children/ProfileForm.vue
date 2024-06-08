<template>
  <div class="profile-form">
    <div class="">
      <UserProfileCard :me="me" class="mb-[25px]" />
      <PageTitle title="Публикации" />
      <FeedList />
    </div>

    <FeedSidebar />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    me: boolean
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .profile-form {
    @include page-container-main-left;
    padding-bottom: 10vh;
  }
</style>

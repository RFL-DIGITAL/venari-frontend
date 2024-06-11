<template>
  <div class="profile-form">
    <div class="">
      <UserProfileCard :me="me" class="mb-[25px]" />
      <PageTitle class="sm:block hidden" title="Публикации" />
      <FeedList />
    </div>

    <FeedSidebar />
  </div>

  <ProfileCvDialog v-if="cvDialogVisible" v-model:visible="cvDialogVisible" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface Props {
    me: boolean
  }

  defineProps<Props>()

  const cvDialogVisible = ref(true)
</script>

<style scoped lang="scss">
  .profile-form {
    @include page-container-main-left;
  }
</style>

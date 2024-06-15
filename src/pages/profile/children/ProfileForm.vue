<template>
  <div class="profile-form">
    <div class="">
    <UserProfileCard :me="me" class="mb-[25px]" :entity="entity"/>
      <PageTitle class="sm:block hidden" title="Публикации" />
      <FeedList />
    </div>

    <FeedSidebar />
  </div>
</template>

<script setup lang="ts">
  import { Company, User } from '@/stores/types/schema'

  interface Props {
    me: boolean
    entity: User | Company
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .profile-form {
    @include page-container-main-left;
  }
</style>

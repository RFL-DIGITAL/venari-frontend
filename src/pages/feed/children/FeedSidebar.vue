<!-- TODO: Запросы -->
<template>
  <div class="feed-page__sidebar">
    <div v-if="user">
      <PageNavigation label="Чаты" :to="{ name: 'chats' }" />

      <div class="feed-page__sidebar__card">
        <chat-preview :chats="chats?.response.slice(0, 5)" />
      </div>
    </div>

    <div>
      <PageNavigation label="Вакансии" :to="{ name: 'vacancy' }" />

      <div class="feed-page__sidebar__card">
        <VacancyPreview />
      </div>
    </div>

    <div>
      <PageNavigation label="Нетворкинг" :to="{ name: 'networking' }" />

      <div class="feed-page__sidebar__card">
        <NetworkingPreview />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/modules/auth-store'
  import {
    BaseResponse,
    ChatsResponse,
    getChatsRequest,
  } from '@/stores/types/schema'
  import { onMounted, ref } from 'vue'

  const chats = ref<BaseResponse<ChatsResponse[]>>()

  const { user } = useAuthStore()

  onMounted(async () => {
    if(user) {
      const chatsRequest = await getChatsRequest()
      chats.value = chatsRequest.data
    }
  })
</script>

<style scoped lang="scss">
  .feed-page__sidebar {
    @apply sm:flex hidden flex-col gap-y-[25px];

    &__card {
      @apply flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px];
    }
  }
</style>

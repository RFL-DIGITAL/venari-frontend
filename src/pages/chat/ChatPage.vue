<!-- TODO: Жду шрифты -->
<template>
  <AppMobileHeader search>
    <PageTitle title="Чаты" />
  </AppMobileHeader>
  <div class="chat-page">
    <div class="chat-page__sidebar" v-if="!isMediaQuery || (isMediaQuery && $route.name === 'chats')">
      <div
        class="flex h-full flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]"
      >
        <chat-preview :chats="chats?.response" />
      </div>
    </div>

    <div class="chat-page__container absolute sm:relative">
      <router-view
        v-if="$route.name !== 'chats'"
        :key="$route.fullPath"
        @updateChats="updateChats"
        :chatInputVisible="true"
      />
      <p class="text-base text-gray mt-4" v-if="$route.name === 'chats' && !isMediaQuery">
        Выберите чат
      </p>
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
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useMediaQueries } from '@/utils/hooks/use-media-queries'

  const $route = useRoute()

  const chats = ref<BaseResponse<ChatsResponse[]>>()

  const { user } = storeToRefs(useAuthStore())

  onMounted(async () => {
    const chatsRequest = await getChatsRequest()
    chats.value = chatsRequest.data
    console.log(chats.value.response)
  })

  const updateChats = async () => {
    const chatsRequest = await getChatsRequest()
    chats.value = chatsRequest.data
  }

  const { isMediaQuery } = useMediaQueries()
</script>

<style lang="scss">
  .chat-page {
    @include page-container-main-right;
    padding-bottom: 0;

    &__container {
      @apply flex flex-col w-full bg-white p-5 pt-[15px] rounded-[15px];
      height: calc(100dvh - 140px);
      @media(max-width: 1024px) {
        height: calc(100dvh - 160px);
      }

    }

    &__sidebar {
      height: calc(100dvh - 140px);

      @media(max-width: 1024px) {
        height: calc(100dvh - 160px);
      }

      @media screen and (max-width: 864px) {
        @apply w-[100vw];
      }
    }
  }
</style>

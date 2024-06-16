<!-- TODO: Жду шрифты -->
<template>
  <AppMobileHeader search>
    <PageTitle title="Чаты" />
  </AppMobileHeader>
  <div class="chat-page">
    <div class="chat-page__sidebar">
      <div
        class="flex h-full flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]"
      >
        <chat-preview :chats="chats?.response"/>
      </div>
    </div>

    <div  v-if="$route.name != 'chats'" class="chat-page__container absolute sm:relative">
      <router-view  :key="$route.fullPath" @updateChats="updateChats" :chatInputVisible="true"/>
      <p v-if="$route.name === 'chats'">Выберите чат</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth-store';
import { BaseResponse, ChatsResponse, getChatsRequest } from '@/stores/types/schema';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

  const $route = useRoute()

  const chats = ref<BaseResponse<ChatsResponse[]>>();

  const { user } = storeToRefs(useAuthStore())

  onMounted(async () => {
    const chatsRequest = await getChatsRequest()
    chats.value = chatsRequest.data;
    console.log(chats.value.response);
  })

  const updateChats = async () => {
    const chatsRequest = await getChatsRequest()
    chats.value = chatsRequest.data;
  }


</script>

<style lang="scss">
  .chat-page {
    @include page-container-main-right;
    padding-bottom: 0;

    &__container {
      @apply flex flex-col w-full h-[83%] bg-white p-[35px] pr-[20px] rounded-[15px];
    }

    &__sidebar {
      @apply h-[72vh];
      @media screen and (max-width: 864px) {
        @apply w-[100vw] ;
        
      }
    }
  }
</style>

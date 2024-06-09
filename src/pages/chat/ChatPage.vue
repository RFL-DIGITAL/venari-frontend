<!-- TODO: Жду шрифты -->
<template>
  <div class="chat-page">
    <div class="chat-page__sidebar">
      <div
        class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]"
      >
        <chat-preview :chats="chats?.response"/>
      </div>
    </div>

    <div class="chat-page__container">
      <router-view />
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


</script>

<style lang="scss">
  .chat-page {
    @include page-container-main-right;

    &__container {
      @apply flex flex-col w-full h-full bg-white p-[35px] pr-[20px] rounded-[15px] h-[85vh];
    }
  }
</style>

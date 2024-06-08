<template>
  <div class="chat-window">
    <h1>{{}}</h1>

    <ScrollPanel ref="scrollPanel" class="chat-window__scroll-panel">
      <div ref="observer" class="observer"></div>
      <ChatMessage
        v-for="(i, index) in messages?.response"
        :key="index"
        :message="i"
        :me="user?.id == i.ownerId"
        :v-model:message="newMessageBody"
        
      />
    </ScrollPanel>

    <ChatInputBlock class="chat-window__input-block" v-model:message="message" @enter="sendMessage"/>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import ScrollPanel from 'primevue/scrollpanel'
  import { nextTick, onMounted, ref } from 'vue'
  import { useAuthStore } from '@/stores/modules/auth-store'
  import {
    BaseResponse,
    ChatsResponse,
    getChatsRequest,
    getPersonalChatMessagesRequest,
  } from '@/stores/types/schema'
  import { useRoute, useRouter } from 'vue-router'
  import Pusher from 'pusher-js'
  const scrollPanel = ref<InstanceType<typeof ScrollPanel> | null>(null)
  let scrollPanelElement: HTMLElement | null = null
  const observer = ref<HTMLElement | null>(null)
  const $route = useRoute()

  const messages = ref<BaseResponse<ChatMessage[]>>()
  const message = ref()

  const chats = ref<BaseResponse<ChatsResponse[]>>()

  const newMessageBody = ref();


  const { user } = storeToRefs(useAuthStore())

  Pusher.logToConsole = true

  const pusher = new Pusher('09627fbd442497554d6f', {
    cluster: 'ap3',
  })

  const addMessage = (message: ChatMessage) => {
    messages.value?.response.push(message)
  }

  const sendMessage = (messageText?: string) => {
    console.log(messageText);
    // отправить сообщение
  }

  onMounted(async () => {
    if (scrollPanel.value) {
      scrollPanelElement = scrollPanel.value.$el.querySelector(
        '.p-scrollpanel-content',
      )
      scrollToBottom()
      initObserver()
    }
    const chatsRequest = await getChatsRequest()
    chats.value = chatsRequest.data
    console.log(chats.value)
    console.log($route.params)
    if (!$route.params.chatType || $route.params.chatType == 'message') {
      const messagesRequest = await getPersonalChatMessagesRequest(
        Number($route.params.id),
      )
      messages.value = messagesRequest.data
      pusher
        .subscribe(`messages-${user.value?.id}`)
        .bind('NewMessageEvent', (e: any) => {
          console.log(e)
          addMessage(e.message)
        })
    }
  })

  function scrollToBottom() {
    if (scrollPanel.value && scrollPanelElement) {
      scrollPanelElement.scrollTop = scrollPanelElement.scrollHeight
    }
  }

  function initObserver() {
    const options = {
      root: scrollPanelElement,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
        }
      })
    }, options)

    if (observer.value) {
      intersectionObserver.observe(observer.value)
    }
  }
</script>

<style scoped lang="scss">
  .chat-window {
    @apply h-full grid gap-y-[20px] relative overflow-hidden;

    &__scroll-panel {
      height: 100%;
      max-height: calc(100vh - 268px);
    }

    &__input-block {
      @apply absolute bottom-0 left-0 right-0 w-full bg-white h-[60px] items-end z-[10];
    }
  }

  :deep(.p-scrollpanel-bar) {
    @apply rounded;
    background: var(--extra-light-gray);
    opacity: 1;
    outline: none;
    outline-offset: 0;
  }

  :deep(.p-scrollpanel-wrapper) {
    @apply border-r-[15px] border-white;
  }

  .observer {
    @apply absolute w-full h-20;
  }
</style>

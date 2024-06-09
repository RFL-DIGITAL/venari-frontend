<template>
  <div class="chat-window">
    <h1>{{}}</h1>

    <ScrollPanel ref="scrollPanel" class="chat-window__scroll-panel">
      <ChatMessage
        v-for="(i, index) in messages?.response"
        :key="index"
        :message="i"
        :me="user?.id == i.ownerId"
        :isLastMessage="index + 1 == messages?.response.length"
      />
      <div class="h-[4vh]"></div>
    </ScrollPanel>

    <ChatInputBlock
      class="chat-window__input-block"
      v-model:message="message"
      @enter="sendMessage"
    />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import ScrollPanel from 'primevue/scrollpanel'
  import { onMounted, ref } from 'vue'
  import { ACCESS_TOKEN_KEY, useAuthStore } from '@/stores/modules/auth-store'
  import {
    BaseResponse,
    ChatsResponse,
    getChatsRequest,
    getPersonalChatMessagesRequest,
    ISendMessage,
    sendMessageRequest,
  } from '@/stores/types/schema'
  import { useRoute, useRouter } from 'vue-router'
  import Pusher from 'pusher-js'
  import Echo from 'laravel-echo'
  const scrollPanel = ref<InstanceType<typeof ScrollPanel> | null>(null)
  let scrollPanelElement: HTMLElement | null = null
  const $route = useRoute()

  const messages = ref<BaseResponse<ChatMessage[]>>()
  const message = ref()

  const chats = ref<BaseResponse<ChatsResponse[]>>()

  const { user } = storeToRefs(useAuthStore())

  const $emit = defineEmits<{
    (e: 'updateChats'): void
  }>()

  Pusher.logToConsole = true

  const pusher = new Pusher('09627fbd442497554d6f', {
    cluster: 'ap3',
  })

  const echo = new Echo({
    broadcaster: 'pusher',
    key: '09627fbd442497554d6f',
    cluster: 'ap3',
    forceTLS: true,
    authEndpoint:
      import.meta.env.VITE_BACKEND_API_ENDPOINT + '/broadcasting/auth',
    auth: {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY),
      },
    },
  })

  const addMessage = (message: ChatMessage) => {
    messages.value?.response.push(message)
  }

  const sendMessage = async (messageText: string) => {
    console.log(messageText)
    const requestBody: ISendMessage = {
      toID: Number($route.params.id),
      body: messageText,
      type: String($route.params.chatType),
    }
    message.value = ''
    const newMesaage: ChatMessage = {
      ownerId: Number(user.value?.id),
      toId: Number($route.params.id),
      owner: null,
      attachments: {
        text: messageText,
        file: null,
        image: null,
        link: null,
      },
      createdAt: new Date(),
    }
    addMessage(newMesaage)
    scrollToBottom()
    const res = await sendMessageRequest(requestBody)
    console.log(res.data)
    $emit('updateChats');
  }

  onMounted(async () => {
    if (scrollPanel.value) {
      scrollPanelElement = scrollPanel.value.$el.querySelector(
        '.p-scrollpanel-content',
      )
      scrollToBottom()
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
      echo
        .private(`messages-${user.value?.id}`)
        .listen('NewMessageEvent', (e) => {
          console.log(e)
          addMessage(e.message)
          scrollToBottom()
        })
    }
  })

  function scrollToBottom() {
    if (scrollPanel.value && scrollPanelElement) {
      scrollPanelElement.lastElementChild?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }
</script>

<style scoped lang="scss">
  .chat-window {
    @apply h-full grid gap-y-[20px] relative overflow-hidden;

    &__scroll-panel {
      height: 90%;
      overflow-y: auto;
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

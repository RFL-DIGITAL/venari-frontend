<template>

  <div :class="'chat-window top-0 ' + className">
    <div class="observer"></div>
    <div v-if="$route.path.startsWith('/chats')" class="w-[98%] absolute top-0">
      <div class="flex flex-row justify-between w-full items-center">
        <div class="flex w-full items-center space-x-2">
          <div class="icon-[outlined/arrow-left] pointer" @click="$router.go(-1)"></div>
          <EntityAvatar :image="activeChat?.avatar"/>

            <div class="flex flex-col gap-y-[5px]">
              <p class="text-base font-bold">{{activeChat?.name}}</p>

              <div class="flex items-center gap-x-[10px]">
                <Chip v-if="isGroupChat()" class="tiny yellow" label="Групповой чат" />
                <p class="text-xs text-gray"></p>
              </div>
            </div>
        </div>
          <div class=" icon-[outlined/chat-more] h-8 w-8"></div> 
        </div>
    </div>
    <ScrollPanel ref="scrollPanel" class="chat-window__scroll-panel">
      <ChatMessage
        v-for="(i, index) in messages?.response"
        :key="index"
        :message="i"
        :me="user?.id == (i.ownerId)"
        :isLastMessage="index + 1 == messages?.response.length"
        :displayName="$route.query.chatType == 'chatMessage' || $props.chatType == 'chatMessage'"
      />
        <div class="h-[4vh]" v-if="chatInputVisible"></div>
        </ScrollPanel>

    <ChatInputBlock
      class="chat-window__input-block"
      v-model:message="message"
      @enter="sendMessage"
      v-if="chatInputVisible"
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
    getChatsMessagesRequest,
    getChatsRequest,
    getPersonalChatMessagesRequest,
    ISendMessage,
    sendMessageRequest,
  } from '@/stores/types/schema'
  import { useRoute } from 'vue-router'
  import Pusher from 'pusher-js'
  import Echo from 'laravel-echo'
  const scrollPanel = ref<InstanceType<typeof ScrollPanel> | null>(null)
  let scrollPanelElement: HTMLElement | null = null
  import Drawer from 'primevue/drawer';
  const $route = useRoute()

  const messages = ref<BaseResponse<ChatMessage[]>>()
  const message = ref()

  const chats = ref<BaseResponse<ChatsResponse[]>>()

  const activeChat = ref<ChatsResponse>()


  const { user } = storeToRefs(useAuthStore())

  interface ChatWindowProps {
    chatType?: string
    chatInputVisible: boolean
    className?: string; 
  }

  const props = defineProps<ChatWindowProps>()

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

  const sendMessage = async (messageText: string, file: string) => {
    console.log(file)
    const requestBody: ISendMessage = {
      toID: Number($route.params.id),
      body: messageText,
      type: String($route.query.chatType ?? props.chatType),
      image: file ? file.slice(22) : null
    }
    message.value = ''
    const newMesaage: ChatMessage = {
      ownerId: Number(user.value?.id),
      toId: Number($route.params.id),
      owner: null,
      attachments: {
        text: messageText,
        file: null,
        image: file,
        link: null,
      },
      createdAt: new Date(),
    }
    console.log(newMesaage);
    
    if (
      $route.params.chatType != 'chatMessage' &&
      props.chatType != 'chatMessage'
    ) {
      addMessage(newMesaage)
    }
    scrollToBottom()
    const res = await sendMessageRequest(requestBody)
    console.log(res.data)
    $emit('updateChats')
  }


  const initChats = async () => {
    const chatsRequest = await getChatsRequest()
    chats.value = chatsRequest.data
    if($route.path.startsWith('/chats')) {
      activeChat.value = chats.value.response.find((i) => i.id == +$route.params.id &&  i.type == $route.query.chatType)
    }
    console.log(activeChat.value);
    
  }


  const initWebSocket = async () => {
    if ($route.query.chatType == 'message' || props.chatType == 'message') {
      const messagesRequest = await getPersonalChatMessagesRequest(
        Number($route.params.id),
      )
      messages.value = messagesRequest.data
      echo
        .private(`messages-${user.value?.id}`)
        .listen('NewMessageEvent', (e) => {
          addMessage(e.message)
          scrollToBottom()
        })
    } else if (
      $route.query.chatType == 'chatMessage' ||
      props.chatType == 'chatMessage'
    ) {
      const messagesRequest = await getChatsMessagesRequest(
        Number($route.params.id),
      )
      messages.value = messagesRequest.data
      echo
        .private(`chat-${$route.params.id}`)
        .listen('NewChatMessageEvent', (e) => {
          console.log(e)
          // addMessage(e.chatMessage)
          scrollToBottom()
        })
    }

  }

  onMounted(async () => {
    console.log(props);
    if (scrollPanel.value) {
      scrollPanelElement = scrollPanel.value.$el.querySelector(
        '.p-scrollpanel-content',
      )
    }
    initChats()
    initWebSocket()
    scrollToBottom() // не работает почему-то

  })


  const isGroupChat = () => {
      return props.chatType == 'chatMessage' || $route.query.chatType == 'chatMessage' ? true : false
  }

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
    @apply h-full relative gap-y-[20px] overflow-hidden;

    &__scroll-panel {
      height: 90%;
      overflow-y: hidden;
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
    @apply w-full;
    height: 12%;
  }
  .chat-window__scroll-panel {
    @apply h-[80%];
  }
  :deep(.p-scrollpanel-content) { 
    padding: 28px 18px 18px 0 !important;
  }
</style>

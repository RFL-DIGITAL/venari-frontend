<template>
  <div class="chat-message text-break" :class="{ me: me }">
    <!-- image -->
    <img
      class="rounded-[20px] max-w-[50%]" :class="{'ml-auto' : me}"
      v-if="message.attachments.image"
      onerror='this.style.display = "none"'
      :src="message.attachments.image"
    />
    <!-- message -->
    <div class="chat-message__message" v-if="!!message.attachments.text">
      <span v-if="displayName && !me">{{ message.owner?.name }}</span>
      {{ message.attachments.text }}
    </div>
    <!-- interview -->
    <div class="chat-message__footer">
      <Button
        @click="openChoiceSlots"
        class="flex-start"
        outlined
        severity="secondary"
        :disabled="me"
        v-if="message.attachments.link && !me"
        >Action Button</Button
      >
      <span v-if="isLastMessage && me">Доставлено</span>
      <span>{{ formatDate(message.createdAt) }}</span>
    </div>
  </div>
  <Dialog
    v-model:visible="choiceSlots"
    header="Запись на интервью"
    :closable="true"
  />
  
</template>

<script setup lang="ts">
  import {
    ChatMessage,
    getAvailableSlotsRequest,
    IGetAvailableSlots,
  } from '@/stores/types/schema'
  import { format, startOfMonth } from 'date-fns'
  import { onMounted, ref } from 'vue'

  interface ChatMessageProps {
    me: boolean
    message: ChatMessage
    isLastMessage: boolean
    displayName: boolean
  }

  const choiceSlots = ref<boolean>()

  const $props = defineProps<ChatMessageProps>()

  const openChoiceSlots = async () => {
    const requestBody: IGetAvailableSlots = {
      accountableId: Number($props.message.attachments.link),
      month: format(startOfMonth(new Date()), 'Y-m-d'),
    }
    const data = await getAvailableSlotsRequest(requestBody)
    console.log(data)
    choiceSlots.value = !choiceSlots.value
  }

  const formatDate = (dateString: string) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    const options = { timeZone: userTimeZone }
    const date = new Date(dateString)
    const formatDate = date.toLocaleTimeString('ru-RU', options)
    return `${formatDate.substring(0, 5)}`
  }
</script>

<style scoped lang="scss">
  .chat-message {
    @apply flex flex-col gap-y-[5px] text-sm py-1;

    &__message {
      @apply flex flex-col w-max max-w-[50%] rounded-[20px] bg-extra-light-gray px-[12px] py-[7px];
      height: max-content;
      word-break: break-all;
    }

    &__footer {
      @apply flex items-center gap-x-[10px] text-gray px-[14px] select-none text-xs;
    }
  }

  .chat-message.me {
    @apply items-end;

    .chat-message__message {
      @apply bg-blue text-white;
    }
  }
</style>

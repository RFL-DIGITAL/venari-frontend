<template>
  <img
    class="rounded-[20px] max-w-[50%]"
    :class="{ 'ml-auto': me }"
    v-if="message.attachments.image"
    onerror='this.style.display = "none"'
    :src="message.attachments.image"
  />
  <Message
    class="!w-8/12"
    :class="{ 'ml-auto': me }"
    :message="{ ...message.attachments, user: message.owner, me: me }"
    :show-avatar="message?.owner && !me"
    v-if="message"
  >
    <template #footer>
      <div class="chat-message__footer w-full">
        <span v-if="isLastMessage && me">Доставлено</span>
        <span class="min-w-[30px]">{{ formatDate(message.createdAt) }}</span>
        <Button
          @click="openChoiceSlots"
          class="flex-start w-full"
          outlined
          severity="secondary"
          :disabled="me"
          v-if="message.attachments.link && !me"
          >Action Button</Button
        >
      </div>
    </template>
  </Message>

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
      @apply flex items-center gap-x-[10px] text-gray select-none text-xs;
    }
  }

  .chat-message.me {
    @apply items-end;

    .chat-message__message {
      @apply bg-blue text-white;
    }
  }

  :deep(.p-button ) {
    @apply rounded-[10px] text-black justify-center;
  }
</style>

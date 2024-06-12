<template>
  <div class="chat-message text-break" :class="{ me: me }">
    <div class="chat-message__message">
     <span v-if="displayName && !me">{{ message.owner?.name }}</span>
    {{ message.attachments.text }}
    </div>
    <div class="chat-message__footer">
      <span v-if="isLastMessage && me">Доставлено</span>
      <span>{{ formatDate(message.createdAt ?? message.created_at) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatMessage } from "@/stores/types/schema"
import { onMounted } from "vue"

  interface ChatMessageProps {
    me: boolean
    message: ChatMessage;
    isLastMessage: boolean;
    displayName: boolean;
  }

  defineProps<ChatMessageProps>()

  const formatDate = (dateString: string) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options = { timeZone:  userTimeZone, };
    const date = new Date(dateString);
    const formatDate = date.toLocaleTimeString('ru-RU', options);
    return `${formatDate.substring(0, 5)}`;
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

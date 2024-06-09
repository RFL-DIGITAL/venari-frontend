<template>
  <div class="chat-message text-break" :class="{ me: me }">
    <div class="chat-message__message">
    {{ message.attachments.text }}
    </div>
    <div class="chat-message__footer">
      <span v-if="me">Доставлено</span>
      <span>10:35</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatMessage } from "@/stores/types/schema"
import { onMounted } from "vue"

  interface ChatMessageProps {
    me: boolean
    message: ChatMessage;
  }

  defineProps<ChatMessageProps>()

</script>

<style scoped lang="scss">
  .chat-message {
    @apply flex flex-col gap-y-[5px] text-sm py-1;

    &__message {
      @apply flex max-w-[70%] rounded-[20px] bg-extra-light-gray px-[12px] py-[7px];
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

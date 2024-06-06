<template>
  <div class="chat-message" :class="{ me: me }">
    <div class="chat-message__message">
      Привет я пишу тебе какой-то текст текст тексткакой-то текст текст
      тексткакой-то текст текст тексткакой-то текст текст тексткакой-то текст
      текст тексткакой-то текст текст тексткакой-то текст текст тексткакой-то
      текст текст тексткакой-то текст текст тексткакой-то текст текст
      тексткакой-то текст текст тексткакой-то текст текст тексткакой-то текст
      текст тексткакой-то текст текст текст
    </div>
    <div class="chat-message__footer">
      <span v-if="me">Доставлено</span>
      <span>10:35</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface ChatMessageProps {
    me: boolean
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

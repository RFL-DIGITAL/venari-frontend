<template>
  <div class="message__container">
    <div class="message__container__avatar" v-if="showAvatar">
      <UserAvatar class="!w-[35px] !h-[35px] mt-auto"/>
    </div>

    <div class="message text-break" :class="{ me: message.me }">
      <div class="message__message">
        {{ message.text }}
      </div>
      <div class="message__footer">
        <slot name="footer">
          <div class="message__footer__content">
            <slot name="footer-content">
              <span v-if="message.me || true">Доставлено</span>
              <span>25.05.2024</span>
              <span>10:35</span>
            </slot>
          </div>
  
          <slot name="footer-action">
            <div>
              <Button class="py-0" plain text @click="$emit('reply', id)">
                <span class="!text-xs">Ответить</span>
                <i class="ml-[5px] w-[14px] h-[14px] icon-[outlined/share]"></i>
              </Button>
            </div>
          </slot>
        </slot>
      </div>
  </div>
  </div>
</template>

<script setup lang="ts">

  interface MessageProps {
    message: Message
    showAvatar: boolean
  }

  export interface Message {
    id: number
    me: boolean
    text: string
    dateTime: string
  }

  const props = defineProps<MessageProps>()

  const $emit = defineEmits<{
    (e: 'reply', value: number): void
  }>()
</script>

<style scoped lang="scss">
.message__container {
  @apply flex gap-x-[10px];

  &__avatar {
    @apply flex flex-col min-w-[35px] w-[35px] justify-end;
    margin-bottom: 25px
  }

  .message {
    @apply flex flex-col gap-y-[5px] text-sm py-1;

    &__message {
      @apply flex w-full rounded-[20px] bg-extra-light-gray px-[12px] py-[7px];
    }

    &__footer {
      @apply flex items-center justify-between text-gray px-[14px] select-none text-xs;

      &__content {
        @apply flex items-center gap-x-[10px];
      }
    }
  }

  .message.me {
    @apply items-end;

    .message__message {
      @apply bg-blue text-white;
    }
  }
}
</style>

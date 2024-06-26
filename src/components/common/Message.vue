<template>
  <div class="message__container">
    <div class="message__container__avatar" v-if="showAvatar">
      <EntityAvatar class="!w-[35px] !h-[35px] mt-auto" :image="message.user?.image?.image" :to="{ name: 'profile', params: { id: message.user.id }}"/>
    </div>

    <div class="message text-break grow" :class="{ me: message.me }">
      <div class="message__message" v-if="message.text">
        {{ message.text }}
      </div>
      <div class="message__footer">
        <slot name="footer">
          <div class="message__footer__content">
            <slot name="footer-content">
              <span v-if="message.me">Доставлено</span>
              <span>{{getLocalDate(message.createdAt).date}}</span>
              <span>{{getLocalDate(message.createdAt).minutes}}</span>
            </slot>
          </div>
  
          <slot name="footer-action" v-if="reply">
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
  import { User } from '@/stores/types/schema'
  import { getLocalDate, formatDate } from '@/utils/functions/get-formatted-time'

  interface MessageProps {
    message: Message
    showAvatar: boolean
    reply: boolean
  }

  export interface Message {
    id: number
    me: boolean
    text: string
    createdAt: string
    user: User
  }

  const props = defineProps<MessageProps>()

  const $emit = defineEmits<{
    (e: 'reply', value: number): void
  }>()
</script>

<style scoped lang="scss">
.message__container {
  @apply flex gap-x-[10px] grow;

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
      @apply bg-red text-white;
    }
  }
}
</style>

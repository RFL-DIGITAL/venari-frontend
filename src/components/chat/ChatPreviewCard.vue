<template>
  <router-link
    class="chat-preview-card"
    :to="{ name: 'chats-active', params: { id: 1 } }"
  >
    <div class="flex items-center">
      <UserAvatar />
    </div>
    <div class="chat-preview-card__content">
      <div class="chat-preview-card__content__header">
        <div class="flex">
          <p class="font-bold mr-1">Джек джексон</p>
          <Chip class="tiny">Компания</Chip>
        </div>
        <span class="text-xs text-gray">10 мин</span>
      </div>

      <p class="chat-preview-card__content__message text-truncate">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  </router-link>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .chat-preview-card {
    @apply flex gap-x-[20px];

    .user-avatar {
      @apply min-w-[66px] min-h-[66px];
    }

    &__content {
      @apply flex flex-col w-full;

      &__header {
        @apply flex items-center justify-between;
      }

      &__message {
        @apply text-gray text-sm-max;
      }
    }
  }

  .chat-preview-card:not(:nth-last-child(1)) {
    .chat-preview-card__content {
      @apply border-b-2 border-light-gray pb-[9px];
    }
  }
</style>

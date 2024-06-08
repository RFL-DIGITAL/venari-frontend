<template>
  <router-link :to="{ name: 'chats-active', params: { id: data.id, chatType: data.type } }">
    <div class="chat-preview-card">
      <div class="flex items-center">
          <UserAvatar />
      </div>
      <div class="chat-preview-card__content">
        <div class="chat-preview-card__content__header">
          <div class="flex">
            <p class="font-medium mr-1">{{ data?.name }}</p>
            <Chip>{{ data?.type == "message" ? 'Компания' : "Групповой чат" }}</Chip>
          </div>
          <span>{{ new Date(data?.updatedAt).toLocaleDateString() }}</span>
        </div>
  
        <p class="chat-preview-card__content__message text-truncate">
          {{ data?.body }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import ChatPreview from "./types";

interface ChatPreviewCardProps {
  data: ChatPreview
}
defineProps<ChatPreviewCardProps>()

</script>
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

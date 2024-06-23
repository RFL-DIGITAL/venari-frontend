<template>
  <router-link :to="{ name: 'chats-active', params: { id: data.id }, query: { chatType: data.type }, }">
    <div class="chat-preview-card">
      <div class="flex items-center">
        <EntityAvatar :image="data.avatar" />
      </div>
      <div class="chat-preview-card__content">
        <div class="chat-preview-card__content__header">
          <div class="flex w-full flex-row justify-between items-center">
            <div class="flex flex-row items-center">
              <p class="font-bold text-sm">{{ data.name.length >= 14 ? data?.name.slice(0, 14) + '...' : data.name }}
              </p>
              <Chip v-if="data?.type !== 'message'" class="ml-2 tiny"
                :label="data?.type === 'companyMessage' ? 'Чат компании' : 'Групповой чат'" 
              />
            </div>

            <span class="text-xs font-light" v-if="data.body">{{ getFormattedTimeForChat(data?.updatedAt) }}</span>

          </div>

        </div>

        <p class="chat-preview-card__content__message text-truncate">
          {{ data?.body }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { getFormattedTimeForChat } from "@/utils/functions/get-formatted-time";
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
      text-overflow: ellipsis;
      width: 19rem;
    }
  }
}

.chat-preview-card:not(:nth-last-child(1)) {
  .chat-preview-card__content {
    @apply border-b-2 border-light-gray pb-[9px];
  }
}
</style>

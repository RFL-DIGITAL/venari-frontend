<template>
  <router-link :to="{ name: 'networking-item', params: { id: networking.id } }">
    <div class="networking">
      <div class="networking__image">
        <img :src="networking.image?.image"/>
      </div>
      <div class="networking__content">
        <div class="networking__content__title">
          <span class="w-fit">{{networking.name}}</span>

          <div class="hidden sm:flex gap-[10px] items-center" v-if="networking.tags.length">
            <Chip v-for="{ id, name } in networking.tags.slice(0,3)" :key="id" :label="name" />
          </div>

          <i
            class="w-[11px] h-[16px] text-gray icon-[outlined/arrow-right] ml-auto"
          />
        </div>

        <div class="networking__content__description">
          {{networking.description}}
        </div>

        <div class="sm:hidden flex sm:gap-x-[10px] gap-x-[5px] items-center" v-if="networking.tags.length">
          <Chip v-for="{ id, name } in networking.tags.slice(0,3)" :key="id" :label="name" />
        </div>

        <BaseButton
          class="w-fit sm:block hidden"
          label="Перейти к чату"
          @click.prevent="handleClickButton"
        />
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
  import { joinChatRequest, Networking } from '@/stores/types/schema'
import { useRouter } from 'vue-router'

  interface Props {
    networking: Networking
  }

  const $props = defineProps<Props>()


  const $router = useRouter();

  async function handleClickButton() {
    if(!$props.networking.isJoined) {
      await joinChatRequest(Number($props.networking.id));
    }
     $router.push({ name: 'chats-active', params: { id: $props.networking?.id,  }, query: { chatType: 'chatMessage' } })
  }
</script>

<style scoped lang="scss">
  .networking {
    @apply grid bg-white rounded-[15px] w-full min-h-[200px] px-[28px] py-[22px] sm:gap-x-[30px] gap-x-[15px] gap-y-[10px];

    @media (min-width: 1024px) {
      grid-template-columns: 150px auto;
    }
    grid-template-columns: 60px auto;

    &__content {
      @apply flex flex-col sm:gap-y-[16px] gap-y-[10px];

      &__title {
        @apply flex gap-x-[15px] items-center;
        @apply text-blue font-bold text-lg;
      }

      &__description {
        @apply text-sm;
        @include text-truncate(3);
      }
    }

    &__image {
      @apply sm:rounded-[10px] rounded-full sm:w-[150px] w-[60px] sm:h-[150px] h-[60px] sm:my-auto;

      img {
        @apply w-full h-full rounded-[10px];
        object-fit: cover;
      }
    }
  }
</style>

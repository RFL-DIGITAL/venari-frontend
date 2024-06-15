<template>
  <router-link
    class="networking-card"
    :to="{ name: 'networking-item', params: { id: networking.id } }"
  >
    <div class="networking-card__content">
      <div class="networking-card__content__title">
        <span>{{networking.name}}</span>
      </div>

      <div class="networking-card__content__description">
        {{networking.description}}
      </div>
    </div>
    <div
      class="w-[13px] h-[20px] self-center text-gray icon-[outlined/arrow-right]"
    ></div>
  </router-link>
</template>

<script setup lang="ts">
  import { Networking } from '@/stores/types/schema'

  interface Props {
    networking: Networking
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .networking-card {
    @apply flex gap-x-[10px];

    &__content {
      @apply flex flex-col gap-y-[10px];

      &__title {
        @apply flex gap-x-[15px];
        @apply text-base font-bold;
      }

      &__description {
        @apply text-xs text-gray;
        @include text-truncate(4);
      }
    }
  }

  .networking-card:not(:nth-last-child(1)) {
    @apply border-b-2 border-light-gray pb-[9px];
  }
</style>

<template>
  <router-link
    class="networking-card"
    :to="{ name: 'networking-item', params: { id: 1 } }"
  >
    <div class="networking-card__content">
      <div class="networking-card__content__title">
        <span>Group Chat Name Here</span>
      </div>

      <div class="networking-card__content__description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. adipiscing elit.adipiscing elit.adipiscin...Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. adipiscing
        elit.adipiscing elit.adipiscin...
      </div>
    </div>
    <div
      class="w-[13px] h-[20px] self-center text-gray icon-[outlined/arrow-right]"
    ></div>
  </router-link>
</template>

<script setup lang="ts"></script>

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

<!-- TODO: Шрифты. Пропсы -->
<template>
  <router-link :to="{ name: 'networking-item', params: { id: 1 } }">
    <div class="networking">
      <div class="networking__image">
        <!-- IMG -->
      </div>
      <div class="networking__content">
        <div class="networking__content__title">
          <span>Group Chat Name Here</span>

          <div class="hidden sm:flex gap-x-[10px] items-center">
            <Chip label="Chat tag 1" />
            <Chip label="Chat tag 1" />
            <Chip label="Chat tag 1" />
          </div>

          <i class="w-[11px] h-[16px] text-gray icon-[outlined/arrow-right] ml-auto" />
        </div>

        <div class="networking__content__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. adipiscing elit.adipiscing
          elit.adipiscin...Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. adipiscing elit.adipiscing
          elit.adipiscin...
        </div>

        <div class="sm:hidden flex sm:gap-x-[10px] gap-x-[5px] items-center">
            <Chip label="Chat tag 1" />
            <Chip label="Chat tag 1" />
            <Chip label="Chat tag 1" />
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
  interface networking {}

  defineProps<networking>()

  function handleClickButton() {
    console.log(1)
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
      @apply bg-light-gray sm:rounded-[10px] rounded-full sm:w-[150px] w-[60px] sm:h-[150px] h-[60px] sm:my-auto;
    }
  }
</style>

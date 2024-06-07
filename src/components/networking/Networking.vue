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

          <div class="flex gap-x-[10px] items-center">
            <Chip label="Chat tag 1" />
            <Chip label="Chat tag 1" />
            <Chip label="Chat tag 1" />
          </div>
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

        <Button
          class="w-fit"
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
    @apply grid bg-white rounded-[15px] w-full min-h-[200px] px-[28px] py-[22px] gap-x-[30px];
    grid-template-columns: 150px auto;

    &__content {
      @apply flex flex-col gap-y-[16px];

      &__title {
        @apply flex gap-x-[15px];
        @apply text-blue font-bold text-lg;
      }

      &__description {
        @apply text-sm;
        @include text-truncate(3);
      }
    }

    &__image {
      @apply bg-light-gray rounded-[10px] w-[150px] h-[150px] my-auto;
    }
  }
</style>

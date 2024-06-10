<template>
  <div class="user-profile-card">
    <div class="user-profile-card__background" />
    <div class="user-profile-card__content">
      <div class="user-profile-card__content__avatar-container">
        <UserAvatar
          class="absolute sm:top-[-58px] top-[-15px] !w-[100px] !h-[100px] sm:!w-[150px] sm:!h-[150px]"
        />
      </div>

      <div class="flex-col">
        <div class="sm:flex sm:mb-[7px] mb-[5px] gap-x-[10px] items-center">
          <p class="sm:text-lg font-semibold title-small">Михаил Федоров</p>
          <p class="sm:text-base text-xs text-gray sm:mt-0 mt-[5px]">@MichaelFedv</p>
        </div>
        <div class="flex mb-[10px]">
          <p class="sm:text-sm text-xs text-gray">
            Senior frontend-developer, Lucas Software
          </p>
        </div>
        <div class="sm:flex hidden gap-x-[10px]">
          <Chip label="3 публикации" />

          <Button class="p-0" plain text>
            <i class="mr-[4px] w-[18px] h-[18px] icon-[outlined/notation]"/>
            <span class="!text-xs">Посмотреть резюме</span>
          </Button>
        </div>
      </div>

      <RouterLink
        class="mt-auto h-fit sm:flex hidden"
        :to="me ? { name: 'profile-edit' } : { name: 'chats-active' }"
      >
        <BaseButton v-if="me" label="Настройки профиля" />
        <BaseButton v-else label="Написать сообщение" />
      </RouterLink>
    </div>
    <div class="flex justify-between items-center sm:hidden">

      <Button class="p-0 sm:hidden flex" plain text>
        <i class="mr-[4px] w-[18px] h-[18px] icon-[outlined/notation]"/>
        <span class="!text-xs">Посмотреть резюме</span>
      </Button>
  
      <RouterLink
        class="mt-auto h-fit w-[]"
        :to="me ? { name: 'profile-edit' } : { name: 'chats-active' }"
      >
        <BaseButton v-if="me" label="Настройки профиля" />
        <BaseButton v-else label="Написать сообщение" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    me: boolean
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .user-profile-card {
    @apply bg-white sm:p-[25px] p-[15px] rounded-[15px];
    &__background {
      @apply h-[180px] bg-red sm:mx-[-25px] mx-[-15px] sm:mt-[-25px] mt-[-15px] rounded-t-[15px];
    }

    &__content {
      @apply grid sm:pt-[20px] pt-[10px] sm:gap-x-[20px] gap-x-[15px];
      grid-template-columns: 150px auto max-content;

      &__avatar-container {
        @apply relative;
      }
    }
  }

  @media (max-width: 1024px) {
    .user-profile-card {
      @apply m-[15px];
      width: calc(100% - 30px);
      box-shadow: 4px 4px 44px 0px rgba(90, 90, 90, 0.25);

      &__content {
        grid-template-columns: 100px auto;
      }
    }
  }
</style>

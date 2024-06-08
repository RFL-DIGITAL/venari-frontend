<template>
  <div class="user-profile-card">
    <div class="user-profile-card__background" />
    <div class="user-profile-card__content">
      <div class="user-profile-card__content__avatar-container">
        <UserAvatar class="absolute -top-[58px] !w-[150px] !h-[150px]" />
      </div>
      <div class="flex-col">
        <div class="flex mb-[7px] gap-x-[10px] items-center">
          <p class="text-lg">Михаил Федоров</p>
          <p class="text-base text-gray">@MichaelFedv</p>
        </div>
        <div class="flex mb-[10px]">
          <p class="text-sm text-gray">
            Senior frontend-developer, Lucas Software
          </p>
        </div>
        <div class="flex gap-x-[10px]">
          <Chip label="3 публикации" />
          <Button class="py-0" plain text>
            <i class="mr-[4px] w-[18px] h-[18px] icon-[outlined/notation]"></i>
            <span class="!text-xs">Посмотреть резюме</span>
          </Button>
        </div>
      </div>

      
      <RouterLink class="mt-auto h-fit" :to="me ? { name: 'profile-edit' } : { name: 'chats-active' }">
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
    @apply bg-white p-[25px] rounded-[15px];
    &__background {
      @apply h-[180px] bg-red -mx-[25px] -mt-[25px] rounded-t-[15px];
    }

    &__content {
      @apply grid pt-[20px] gap-x-[20px];
      grid-template-columns: 150px auto max-content;

      &__avatar-container {
        @apply relative;
      }
    }
  }
</style>

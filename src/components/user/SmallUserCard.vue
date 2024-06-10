<!-- TODO: Доделать -->
<template>
  <div class="user-card flex items-center gap-x-[10px]">
    <UserAvatar class="w-[60px] h-[60px]"/>
    <div class="flex flex-col gap-y-[6px]">
      <p class="font-semibold sm:text-lg text-sm">Джек джексон</p>
      <span class="text-gray sm:text-base text-sm">@jack</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  /* TODO: типизация */
  interface UserCardProps {
    user: any
  }

  defineProps<UserCardProps>()
</script>

<style scoped></style>

<!-- TODO: Доделать -->
<template>
  <div class="user-card flex items-center gap-x-[10px]">
    <UserAvatar />
    <div class="flex flex-col gap-y-[3px]">
      <div class="flex items-center text-base">
        <p class="font-medium mr-1">Джек джексон</p>
        <span class="text-gray">@jack</span>
      </div>
      <div class="flex items-center">
        <Chip class="tiny !text-xs">Компания</Chip>
      </div>
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

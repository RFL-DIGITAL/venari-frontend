<!-- TODO: Доделать -->
<template>
  <div class="user-card flex items-center gap-x-[10px]">
    <UserAvatar />
    <div class="flex flex-col gap-[3px]">
      <div class="flex items-center">
        <p class="font-medium mr-1">Джек джексон</p>
        <span>@jack</span>
      </div>
      <div class="flex items-center">
        <Chip>Компания</Chip>
        <span>Кемерово, Россия</span>
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

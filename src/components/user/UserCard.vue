<!-- TODO: Доделать -->
<template>
  <div class="user-card flex items-center gap-x-[10px]">
    <UserAvatar />
    <div class="flex flex-col gap-y-[3px]">
      <div class="flex items-center sm:text-base text-sm gap-x-[10px]">
        <p class="sm:font-bold font-medium">{{ user?.name || username }}</p>
        <span v-if="user?.name" class="text-gray">@{{ user.name }}</span>
      </div>
      <div class="flex items-center">
        <Chip class="tiny !text-xs">Компания</Chip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { User } from '@/stores/types/schema'

  interface UserCardProps {
    user: User
    username: string
  }

  defineProps<UserCardProps>()
</script>

<style scoped></style>

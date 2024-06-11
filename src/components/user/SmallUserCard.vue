<template>
  <router-link :to="{ name: 'profile', params: { id: entity.id } }">
    <div class="user-card flex items-center gap-x-[10px]">
      <EntityAvatar class="w-[60px] h-[60px]" />
      <div class="flex flex-col gap-y-[6px]">
        <p class="font-semibold sm:text-lg text-sm">{{entity.name}}</p>
        <span class="text-gray sm:text-base text-sm cursor-pointer">@{{ entity.nickName || entity.name }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
  import { Company, User } from '@/stores/types/schema'

  interface UserCardProps {
    entity: User | Company
  }

  defineProps<UserCardProps>()
</script>

<style scoped></style>

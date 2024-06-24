<template>
  <div class="text-h-xl hidden xl:block text-red-error">NOT FOUND {{  user  }}</div>
  <div class="icon-[outlined/search] w-10 h-10 text-red-600"></div>
  <UserCard/>
  <Image src="/images/post.png" alt="logo" width="400" />

</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth-store'

  const { user } = useAuthStore()
</script>

<style scoped></style>

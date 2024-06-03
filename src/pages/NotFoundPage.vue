<template>
  <div>NOT FOUND {{  user  }}</div>
  <div class="icon-[outlined/search] w-10 h-10 text-blue-600"></div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/types/modules/auth-store'

  const { user } = useAuthStore()
</script>

<style scoped></style>

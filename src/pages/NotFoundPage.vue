<template>
  <div>NOT FOUND {{  user  }}</div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/types/modules/auth-store'

  const { user } = useAuthStore()
</script>

<style scoped></style>

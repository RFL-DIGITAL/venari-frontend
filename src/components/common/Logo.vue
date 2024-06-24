<template>
  <div v-if="white" class="w-[140px] h-[38px] icon-[logo-white]" />
  <div v-else class="w-[140px] h-[38px] icon-[logo]" />
</template>

<script setup lang="ts">
  interface Props {
    white?: boolean
  }

  defineProps<Props>()
</script>

<style scoped></style>

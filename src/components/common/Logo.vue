<template>
  <div v-if="white" class="w-[140px] h-[38px] icon-[logo] text-white" />
  <div v-else class="w-[140px] h-[38px] icon-[logo] text-black" />
</template>

<script setup lang="ts">
  interface Props {
    white?: boolean
  }

  defineProps<Props>()
</script>

<style scoped></style>

<template>
  <ButtonNotification @click="visible = true" />
  <NotificationDialog v-if="visible" v-model:visible="visible" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const visible = ref(false)
</script>

<style scoped></style>

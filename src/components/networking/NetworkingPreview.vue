<template>
    <div class="vacancy-preview">
      <NetworkingCard v-for="i in 5" :key="i" />
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
    .vacancy-preview {
      @apply flex flex-col gap-y-[15px];
    }
  </style>
  
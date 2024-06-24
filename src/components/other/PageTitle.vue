<template>
  <div class="text-page-title col-span-2">
    {{ title }}
    <p class="text-sm text-gray" v-if="description">
      {{description}}
    </p>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    title: string
    description: string
  }

  defineProps<Props>()
</script>

<style scoped></style>

<template>
  <router-link :to="to">
    <div class="text-page-title col-span-2 flex gap-x-[8px] flex items-center">
      <p>{{ label }}</p>
      <i class="w-[18px] h-[28px] text-black icon-[outlined/arrow-right]" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
  import { RouteLocationRaw } from 'vue-router'

  interface Props {
    label: string
    to: RouteLocationRaw
  }

  defineProps<Props>()
</script>

<style scoped></style>

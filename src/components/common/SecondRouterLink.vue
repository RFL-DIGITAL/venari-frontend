<template>
  <RouterLink :to="to" class="flex items-center gap-x-[5px]">
    <i class="w-[18px] h-[28px] text-gray icon-[outlined/arrow-left]"/>
    <p class="text-gray text-title-small !text-semibold">{{ title }}</p>
  </RouterLink>
</template>

<script setup lang="ts">
  import { RouteLocationRaw } from 'vue-router'

  interface Props {
    to: RouteLocationRaw
    title: string
  }

  defineProps<Props>()
</script>

<style scoped></style>

<template>
  <div class="skill-chip">
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    label: string
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .skill-chip {
    @apply rounded-[10px] bg-extra-light-gray sm:text-sm text-xs py-[10px] sm:px-[15px] px-[10px];
  }
</style>

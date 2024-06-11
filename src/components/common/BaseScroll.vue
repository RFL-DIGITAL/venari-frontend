<template>
  <ScrollPanel class="base-scroll">
    <slot></slot>
  </ScrollPanel>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  :deep(.p-scrollpanel-bar) {
    @apply rounded;
    background: var(--extra-light-gray);
    opacity: 1;
    outline: none;
    outline-offset: 0;
  }

  :deep(.p-scrollpanel-wrapper) {
    @apply border-r-[15px] border-white;
  }
</style>

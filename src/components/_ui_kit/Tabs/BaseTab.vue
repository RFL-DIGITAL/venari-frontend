<template>
  <Tab class="base-tab" :value="value">
    <BaseToggleButton v-bind="{ ...$props, ...$attrs }" />
  </Tab>
</template>

<script setup lang="ts">
  import { BaseToggleButtonProps } from '../buttons/BaseToggleButton.vue'

  export interface BaseTab extends BaseToggleButtonProps {
    value: string
  }

  defineProps<BaseTab>()
</script>

<style scoped lang="scss">
  .base-tab {
  }
</style>

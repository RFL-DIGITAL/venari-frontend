<template>
  <ToggleButton
    class="base-toggle-button"
    v-bind="$attrs"
    :disabled="disabled"
    v-model="_value"
    :onLabel="label"
    :offLabel="label"
    :onIcon="leftIcon"
    :offIcon="leftIcon"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  export interface BaseToggleButtonProps {
    label: string
    leftIcon?: string
    rightIcon?: string
    disabled?: boolean
    modelValue: boolean
  }

  const props = defineProps<BaseToggleButtonProps>()

  const $emit = defineEmits<{
    (e: 'update:model-value', value: boolean): void
  }>()

  const _value = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      $emit('update:model-value', value)
    },
  })
</script>

<style lang="scss">
  .base-toggle-button.p-togglebutton .p-button {
    @apply text-black flex items-center gap-x-[5px] rounded-[10px] bg-white border border-light-gray pt-2.5 px-[15px];
    transition: all linear 0.15s;

    & * {
      transition: all linear 0.15s;
    }

    .p-button-label {
      @apply font-semibold sm:text-sm text-xs m-0;
      color: inherit;
    }

    .p-button-icon {
      @apply sm:h-[24px] h-[16px] m-0;
      color: inherit;
    }
  }

  .base-toggle-button.p-togglebutton:not(.p-disabled).p-highlight .p-button {
    @apply bg-blue border-blue text-white;
  }

  .base-toggle-button.p-togglebutton:not(.p-disabled):has(
      .p-togglebutton-input:hover
    ):not(.p-highlight)
    .p-button {
    @apply bg-blue border-blue text-white;
  }

  .base-toggle-button.p-togglebutton.p-highlight .p-button::before {
    box-shadow: none;
    content: none;
  }

  
</style>

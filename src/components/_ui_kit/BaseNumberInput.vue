<template>
    <IconField
      class="base-input"
      :class="{ white: white }"
      :iconPosition="iconPosition"
      v-on:keyup.enter="$emit('enter', _value)"
    >
      <InputIcon
        v-if="icon"
        :class="`${icon} ${iconActive ? 'active' : ''}`"
        :style="`height: ${iconSize}px; width: ${iconSize}px; top: calc(100% - ${iconSize}px`"
        @click="() => (iconActive ? $emit('enter', _value) : null)"
      />
      <InputNumber
        class="base-input__input"
        v-model="_value"
        :placeholder="label"
        :type="type"
        :invalid="!!errorMessages"
      />
    </IconField>
  </template>
  
  <script setup lang="ts">
    import InputNumber from 'primevue/inputnumber';

    import { computed } from 'vue'
  
    interface Props {
      type: string
      modelValue: number
      icon?: string
      label: string
      iconPosition?: 'left' | 'right'
      iconSize?: number
      iconActive?: boolean
      white: boolean
      errorMessages?: string
    }
  
    const props = withDefaults(defineProps<Props>(), {
      type: 'text',
      iconSize: 24,
    })
  
    const $emit = defineEmits<{
      (e: 'update:model-value', value: number): void
      (e: 'enter', value: number): void
    }>()
  
    const _value = computed({
      get() {
        return props.modelValue
      },
      set(value: number) {
        $emit('update:model-value', value)
      },
    })
  </script>
  
  <style scoped lang="scss">
    .base-input {
      @apply w-[350px] h-[44px];
  
      &__input {
        @apply h-[44px] w-[330px];
      }
    }
  
    .base-input.white,
    .base-input.white :deep(.p-inputtext) {
      @apply bg-white w-full;
    }
  
    .base-input.white :deep(.p-inputtext) {
      @apply border border-light-gray border-solid;
    }
  </style>
  
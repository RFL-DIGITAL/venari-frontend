<template>
  <Calendar
    v-model="_value"
    selectionMode="range"
    :manualInput="false"
    :placeholder="label"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    type: string
    modelValue: Date[]
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
    (e: 'update:model-value', value: Date[]): void
  }>()

  const _value = computed({
    get() {
      return props.modelValue
    },
    set(value: Date[]) {
      $emit('update:model-value', value)
    },
  })
</script>

<style scoped lang="scss">
.p-calendar {
    @apply w-full outline-none;
    :deep(.p-inputtext) {
        @apply bg-extra-light-gray rounded-[10px];
    }
}
</style>

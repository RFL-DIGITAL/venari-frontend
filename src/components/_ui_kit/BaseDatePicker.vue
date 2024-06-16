<template>
  <Calendar
    v-model="_value"
    :class="{ white: white }"
    :manualInput="false"
    :placeholder="label"
    :invalid="!!errorMessages"
    :view="view"
    :date-format="dateFormat"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { format } from 'date-fns'

  interface Props {
    type: string
    modelValue: string
    icon?: string
    label: string
    iconPosition?: 'left' | 'right'
    iconSize?: number
    iconActive?: boolean
    white: boolean
    errorMessages?: string
    view: 'month' | 'year' | 'date'
    dateFormat: string
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    iconSize: 24,
    view: 'date',
    dateFormat: 'dd.mm.yyyy',
  })

  const $emit = defineEmits<{
    (e: 'update:model-value', value: string): void
  }>()

  const _value = computed({
    get() {
      return props.modelValue ? new Date(props.modelValue) : null
    },
    set(value: Date | null) {
      $emit('update:model-value', value !== null ? format(value?.toISOString(), 'yyyy-MM-dd') : value)
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

  .p-calendar.white {
    @apply bg-white w-full;

    :deep(.p-inputtext) {
      @apply bg-white w-full;
    }
  }

  .p-calendar.white {
    :deep(.p-inputtext) {
      @apply border border-light-gray border-solid;
    }
  }

  .p-calendar.p-invalid.p-component {
    :deep(.p-inputtext) {
      border-color: #f87171 !important;
    }
  }
</style>

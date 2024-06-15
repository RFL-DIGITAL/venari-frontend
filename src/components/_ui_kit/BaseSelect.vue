<template>
  <Dropdown
    v-model="_value"
    :options="options"
    optionLabel="name"
    optionValue="id"
    :placeholder="label"
    showClear
  />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  interface Props {
    label: string
    options: any[]
    modelValue: number
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:model-value', value: string): void
  }>()

  const _value = computed({
    get() {
      return props.modelValue
    },
    set(value: string) {
      $emit('update:model-value', value)
    },
  })
</script>

<style lang="scss" scoped>
.p-dropdown {
  @apply w-full rounded-[10px] outline-none;
}

:deep(.p-dropdown-label.p-inputtext.p-placeholder), :deep(.p-dropdown-label.p-inputtext) {
  @apply bg-white;
}

</style>

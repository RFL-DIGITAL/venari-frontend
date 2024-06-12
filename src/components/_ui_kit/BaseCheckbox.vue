<template>
  <div class="flex items-center gap-x-[10px]">
    <Checkbox v-model="_value" binary />
    <span class="text-xs">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  interface Props {
    label: string
    modelValue: boolean
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:model-value', value: boolean): void
  }>()

  const _value = computed({
    get() {
      return props.modelValue ?? false
    },
    set(value: boolean) {
      $emit('update:model-value', value)
    },
  })
</script>

<style lang="scss" scoped>
:deep(.p-highlight > .p-checkbox-box) {
  @apply border-blue bg-blue;
}
</style>

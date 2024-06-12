<template>
  <Textarea v-model="_value" rows="5" cols="30" :placeholder="label" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  interface Props {
    label: string
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
.p-inputtextarea {
  @apply w-full bg-white border border-light-gray border-solid min-h-[200px];
}
</style>

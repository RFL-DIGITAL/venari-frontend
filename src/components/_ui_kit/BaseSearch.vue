<template>
  <BaseInput
    v-model="_value"
    icon="icon-[outlined/search]"
    label="Поиск"
    icon-position="left"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    modelValue: string
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

<style scoped lang="scss">
  .base-search {
    @apply w-[350px] h-[44px];

    &__search {
      @apply h-[44px] w-[330px];
    }
  }
</style>

<template>
  <IconField class="base-search" iconPosition="left">
    <InputIcon class="w-[24px] h-[24px] icon-[outlined/search]" />
    <InputText
      class="base-search__search"
      v-model="_value"
      placeholder="Поиск"
      type="text"
    />
  </IconField>
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

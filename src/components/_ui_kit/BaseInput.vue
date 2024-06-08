<template>
  <IconField class="base-input" :iconPosition="iconPosition">
    <InputIcon v-if="icon" :class="`w-[${iconSize}px] h-[${iconSize}px] icon-[${icon}]`" />
    <InputText
      class="base-input__input"
      v-model="_value"
      :placeholder="label"
      :type="type"
    />
  </IconField>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    type: string
    modelValue: string
    icon?: string
    label: string
    iconPosition?: 'left' | 'right'
    iconSize?: number
  }

  const props = withDefaults(defineProps<Props>(),{
    type: 'text',
    iconSize: 24,
  })

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
  .base-input {
    @apply w-[350px] h-[44px];

    &__input {
      @apply h-[44px] w-[330px];
    }
  }
</style>

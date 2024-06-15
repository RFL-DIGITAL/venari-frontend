<template>
  <SelectButton
    :model-value="{id: _value}"
    :options="options"
    optionLabel="name"
    dataKey="id"
    aria-labelledby="custom"
    @update:model-value="(val: NameIdResource) => val ? _value = val?.id : null"
  />
</template>

<script setup lang="ts">
  import SelectButton from 'primevue/selectbutton'
  import { computed } from 'vue'

  interface NameIdResource {
    name: string, id: number
  }

  interface Props {
    options: NameIdResource[]
    modelValue: number
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:model-value', value: number): void
  }>()

  const _value = computed({
    get() {
      return props.modelValue
    },
    set(value: number) {
      console.log(value)

      $emit('update:model-value', value)
    },
  })

</script>

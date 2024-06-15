<template>
  <SelectButton
    :model-value="{ id: _value }"
    :options="options"
    optionLabel="name"
    dataKey="id"
    aria-labelledby="custom"
    @update:model-value="
      (val: NameIdResource) => (val ? (_value = val?.id) : null)
    "
  >
    <template #option="slotProps">
      <i
        v-if="slotProps.option.icon"
        class="mr-[5px] w-5 h-5"
        :class="slotProps.option.icon"
      ></i>
      <p class="text-sm">{{ slotProps.option.name }}</p>
    </template>
  </SelectButton>
</template>

<script setup lang="ts">
  import SelectButton from 'primevue/selectbutton'
  import { computed } from 'vue'

  interface NameIdResource {
    name: string
    id: number
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

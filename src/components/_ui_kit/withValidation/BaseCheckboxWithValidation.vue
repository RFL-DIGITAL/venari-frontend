<template>
  <BaseCheckbox
    :model-value="formValue"
    :error-messages="
      baseErrorMessage ? props.errorMessages || baseErrorMessage : undefined
    "
    @update:model-value="handleInput"
    @blur="handleBlur"
  >
    <template v-for="(_, slotName) in $slots" v-slot:[slotName]="scope">
      <slot :name="slotName" v-bind="{ ...scope }" />
    </template>
  </BaseCheckbox>
</template>

<script lang="ts" setup>
  // Core
  import { required } from '@vee-validate/rules'
  import { useField } from 'vee-validate'

  interface IProps {
    name: string
    validateOnBlur: boolean
    errorMessages: string
  }

  const props = withDefaults(defineProps<IProps>(), {
    validateOnBlur: true,
  })

  const {
    value: formValue,
    errorMessage: baseErrorMessage,
    handleChange,
    validate,
  } = useField<string>(props.name, required, { validateOnValueUpdate: false })

  function handleInput(value: string) {
    handleChange(value, false)

    if (!props.validateOnBlur) validate()
  }

  function handleBlur() {
    if (props.validateOnBlur) validate()
  }
</script>

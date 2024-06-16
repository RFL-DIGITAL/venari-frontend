<template>
  <div>
    <p class="text-base font-bold text-gray mb-[7px]">Компания</p>
    <BaseInputWithValidation
      white
      class="w-full"
      label="Название компании"
      name="companyId"
    />
  </div>

  <div>
    <p class="text-base font-bold text-gray mb-[7px]">Должность</p>
    <BaseInputWithValidation
      name="positionId"
      white
      class="w-full"
      label="Должность, на которой вы работали"
    />
  </div>

  <div class="grid grid-cols-2 gap-x-5">
    <div>
      <p class="text-base font-bold text-gray mb-[7px]">Месяц, год начала</p>
      <BaseDatePickerWithValidation
        white
        class="w-full"
        label="Год начала"
        name="startDate"
        dateFormat="yy"
        view="year"
      />
    </div>

    <div>
      <p class="text-base font-bold text-gray mb-[7px]">Месяц, год окончания</p>
      <BaseDatePickerWithValidation
        white
        class="w-full"
        label="Год окончания"
        name="endDate"
        dateFormat="yy"
        view="year"
      />
    </div>

    <div class="col-span-2 h-[15px] text-xs text-gray mt-2">
      Если вы продолжаете работу на этом месте — оставьте поле с окончанием
      незаполненным
    </div>
  </div>

  <div>
    <p class="text-base font-bold text-gray mb-[7px]">О работе</p>
    <BaseTextAreaWithValidation label="О работе" name="description" />
    <div class="text-xs text-gray mt-2">
      Поле полностью редактируемое — вы можете удалить заданный шаблон
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { useForm } from 'vee-validate'
  import { ResumeCreateUserPositionBody } from '@/stores/types/schema'

  interface Form extends ResumeCreateUserPositionBody {}

  interface Props {
    userPosition: ResumeCreateUserPositionBody
  }

  interface Expose {
    validate: () => Promise<{
      formValid: boolean, 
      errors: any
    }>
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:userPosition', value: Form): void
  }>()

  const initialValues = computed<Form>(() => {
    return {
      companyId: props.userPosition.companyId,
      positionId: props.userPosition.positionId,
      startDate: props.userPosition.startDate,
      endDate: props.userPosition.endDate,
      description: props.userPosition.description,
    }
  })

  const validationSchema = computed(() => {
    return {
      companyId: 'required',
      positionId: 'required',
      startDate: 'required',
      endDate: 'required',
      description: 'required',
    }
  })

  const { values: form, validate: _validate, errors } = useForm<Form>({
    initialValues: initialValues.value,
    validationSchema,
  })

  watch(
    () => form,
    () => $emit('update:userPosition', form),
    { deep: true },
  )

  defineExpose<Expose>({
    validate,
  })

  async function validate() {
    const { valid } = await _validate()

    return { formValid: valid, errors }
  }
</script>

<style scoped></style>

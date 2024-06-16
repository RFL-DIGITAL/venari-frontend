<template>
  <div>
    <p class="text-base font-bold text-gray mb-[7px]">Учебное заведение</p>
    <BaseInputWithValidation
      white
      class="w-full"
      label="Название учебного заведения"
      name="schoolId"
    />
  </div>

  <div class="grid grid-cols-2 gap-5">
    <div>
      <p class="text-base font-bold text-gray mb-[7px]">Уровень образования</p>
      <BaseSelectWithValidation
        label="Выберите уровень"
        :options="filters?.programTypes"
        name="programType"
      />
    </div>

    <div>
      <p class="text-base font-bold text-gray mb-[7px]">Специализация</p>
      <BaseSelectWithValidation
        label="Выберите уровень"
        :options="filters?.programs"
        name="programId"
      />
    </div>

    <!-- TODO: Календарь -->
    <div>
      <p class="text-base font-bold text-gray mb-[7px]">Год выпуска</p>
      <BaseDatePickerWithValidation
        white
        label="Год выпуска"
        name="endDate"
        dateFormat="yy"
        view="year"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useResumeStore } from '@/stores/modules/resume-store'
  import { computed, watch } from 'vue'
  import { useForm } from 'vee-validate'
  import { ResumeCreateProgramSchollBody } from '@/stores/types/schema'

  const { filters } = storeToRefs(useResumeStore())

  interface Form extends ResumeCreateProgramSchollBody {}

  interface Props {
    programSchool: ResumeCreateProgramSchollBody
  }

  interface Expose {
    validate: () => Promise<{
      formValid: boolean, 
      errors: any
    }>
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:programSchool', value: Form): void
  }>()

  const initialValues = computed<Form>(() => {
    return {
      programId: props.programSchool.programId,
      schoolId: props.programSchool.schoolId,
      startDate: props.programSchool.startDate,
      endDate: props.programSchool.endDate,
      programType: props.programSchool.programType,
    }
  })

  const validationSchema = computed(() => {
    return {
      programId: 'required',
      schoolId: 'required',
      endDate: 'required',
      programType: 'required',
    }
  })

  const { values: form, validate: _validate, errors } = useForm<Form>({
    initialValues: initialValues.value,
    validationSchema,
  })

  watch(
    () => form,
    () => $emit('update:programSchool', form),
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

<template>
  <div class="grid grid-cols-2 gap-5">
    <div>
      <p class="text-base font-bold text-gray mb-[7px]">Язык</p>
      <BaseSelectWithValidation
        :options="filters?.languages"
        white
        class="w-full"
        label="Язык"
        name="languageId"
      />
    </div>

    <div>
      <p class="text-base font-bold text-gray mb-[7px]">Уровень</p>
      <BaseSelectWithValidation
        :options="filters?.level"
        white
        class="w-full"
        label="Выберите уровень"
        name="levelId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useForm } from 'vee-validate'
  import { ResumeCreateLanguageLevelBody } from '@/stores/types/schema'
  import { useResumeStore } from '@/stores/modules/resume-store'

  const { filters } = storeToRefs(useResumeStore())

  interface Form extends ResumeCreateLanguageLevelBody {}

  interface Props {
    languageLevel: ResumeCreateLanguageLevelBody
  }

  interface Expose {
    validate: () => Promise<{
      formValid: boolean, 
      errors: any
    }>
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:languageLevel', value: Form): void
  }>()

  const initialValues = computed<Form>(() => {
    return {
      levelId: props.languageLevel ? props.languageLevel.levelId : null,
      languageId: props.languageLevel ? props.languageLevel.languageId : null,
    }
  })

  const validationSchema = computed(() => {
    return {
      levelId: 'required',
      languageId: 'required',
    }
  })

  const { values: form, validate: _validate, errors } = useForm<Form>({
    initialValues: initialValues.value,
    validationSchema,
  })

  watch(
    () => form,
    () => $emit('update:languageLevel', form),
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

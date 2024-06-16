<template>
  <div class="grid grid-cols-2 gap-5">
    <div>
      <p class="text-base font-bold text-gray mb-[7px]">Язык</p>
      <BaseInputWithValidation
        white
        class="w-full"
        label="Язык"
        name="languageId"
      />
    </div>

    <div>
      <p class="text-base font-bold text-gray mb-[7px]">Уровень</p>
      <BaseInputWithValidation
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
  import { useForm } from 'vee-validate'
  import { ResumeCreateLanguageLevelBody } from '@/stores/types/schema'

  interface Form extends ResumeCreateLanguageLevelBody {}

  interface Props {
    languageLevel: ResumeCreateLanguageLevelBody
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

  const { values: form } = useForm<Form>({
    initialValues: initialValues.value,
  })

  watch(
    () => form,
    () => $emit('update:languageLevel', form),
    { deep: true },
  )
</script>

<style scoped></style>

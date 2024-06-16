<template>
  <div class="grid grid-cols-12 w-full h-full grow">
    <div class="resume-form col-span-9">
      <div class="grow">
        <p class="text-base font-bold text-gray mb-[7px]">Желаемая должность</p>
        <BaseInputWithValidation
          name="position"
          white
          class="w-full"
          label="Желаемая должность"
        />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">
          Специализация должности
        </p>
        <BaseSelectWithValidation
          :options="filters?.specializations"
          label="Выберите специализацию"
          name="specializationId"
        />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Город проживания</p>
        <BaseInputWithValidation
          white
          class="w-full"
          label="Город проживания"
          name="cityId"
        />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Желаемый доход</p>
        <div class="max-w-[265px]">
          <BaseNumberInputWithValidation
            white
            class="w-full"
            label="Желаемый доход"
            name="salary"
          />
        </div>
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Занятость</p>
        <BaseSelectButtonWithValidation
          name="employmentId"
          :options="filters?.employments"
        />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Формат</p>
        <BaseSelectButtonWithValidation
          name="formatId"
          :options="filters?.formats"
        />
      </div>

      <!-- RESUME SCHOOL -->
      <template v-if="form.programSchools.length">
        <ResumeSchoolForm ref="resumeSchoolForms"
          v-for="(scholl, index) in form.programSchools"
          :key="index"
          :programSchool="form.programSchools[index]"
          @update:programSchool="(val: any) => handleForm('programSchools', index, val)"
        />
      </template>

      <div class="flex items-center gap-x-[25px]">
        <p
          class="text-base font-bold text-gray mb-[7px]"
          v-if="!form.programSchools.length"
        >
          Образование
        </p>
        <SecondButton
          label="Добавить ещё образование"
          leftIcon="icon-[outlined/plus]"
          @click="handleAddBaseProgramSchool"
        />
      </div>
      <!--  -->

      <div class="mb-2.5 border-b-2 border-extra-light-gray w-full" />

      <!-- ResumeWorkForm -->
      <template v-if="form.userPositions.length">
        <ResumeWorkForm ref="resumeWorkForms"
          v-for="(position, index) in form.userPositions"
          :key="index"
          :userPosition="form.userPositions[index]"
          @update:userPosition="(val: any) => handleForm('userPositions', index, val)"
        />
      </template>

      <div class="flex items-center gap-x-[25px]">
        <p
          class="text-base font-bold text-gray mb-[7px]"
          v-if="!form.userPositions.length"
        >
          Опыт и место работы
        </p>
        <SecondButton
          class="w-fit"
          label="Добавить ещё место работы"
          leftIcon="icon-[outlined/plus]"
          @click="handleAddBaseUserPositions"
        />
      </div>
      <!--  -->

      <!-- ResumeLanguageForm -->
      <template v-if="form.languageLevels.length">
        <ResumeLanguageForm ref="resumeLanguageForms"
          v-for="(language, index) in form.languageLevels"
          :key="index"
          :languageLevel="form.languageLevels[index]"
          @update:languageLevel="(val: any) => handleForm('languageLevels', index, val)"
        />
      </template>

      <div class="flex items-center gap-x-[25px]">
        <p
          class="text-base font-bold text-gray mb-[7px]"
          v-if="!form.languageLevels.length"
        >
          Владение языками
        </p>
        <SecondButton
          class="w-fit"
          label="Добавить язык"
          leftIcon="icon-[outlined/plus]"
          @click="handleAddBaseLanguageLevels"
        />
      </div>
      <!--  -->

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Ключевые навыки</p>
        <BaseInputWithValidation
          white
          label="Расскажите о себе"
          name="skills"
        />
        <div class="text-xs text-gray mt-2">
          Для разделения используйте запятую
        </div>
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Дополнительно</p>
        <BaseTextAreaWithValidation
          label="Расскажите о себе"
          name="description"
        />
      </div>
    </div>
    <div
      class="flex justify-center w-full gap-x-[15px] mt-[30px] mb-5 h-[38px] col-span-12"
    >
      <BaseButton label="Сохранить резюме" @click="submit" />
      <SecondButton label="Заполнить позже" @click="$emit('late')" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useForm } from 'vee-validate'
  import {
    ResumeCreateRequestBody,
    Resume,
  } from '@/stores/types/schema'

  import { useResumeStore } from '@/stores/modules/resume-store'

  import { cloneDeep, split } from 'lodash'

  // Components
  import ResumeSchoolForm from './ResumeSchoolForm.vue'
  import ResumeLanguageForm from './ResumeLanguageForm.vue'
  import ResumeWorkForm from './ResumeWorkForm.vue'

  import useNotify from '@/utils/hooks/useNotify'

  interface Form extends ResumeCreateRequestBody {}

  interface Props {
    resume: Resume
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'submit', value: Form): void
    (e: 'late'): void
  }>()

  const { notifyError } = useNotify()

  const { filters } = storeToRefs(useResumeStore())
  const { getFilters } = useResumeStore()

  fetchFilter()
  async function fetchFilter() {
    getFilters().catch(notifyError)
  }

  const resumeSchoolForms = ref<InstanceType<typeof ResumeSchoolForm>[]>([])
  const resumeLanguageForms = ref<InstanceType<typeof ResumeLanguageForm>[]>([])
  const resumeWorkForms = ref<InstanceType<typeof ResumeWorkForm>[]>([])

  const initialValues = computed<Form>(() => {
    return {
      contactPhone: props.resume?.contactPhone ? props.resume.contactPhone : '',
      contactMail: props.resume?.contactMail ? props.resume.contactMail : '',
      salary: props.resume?.salary ? Number.parseInt(props.resume.salary) : '',
      description: props.resume?.description ? props.resume.description : '',
      programSchools: props.resume?.resumeProgramSchools
        ? props.resume.resumeProgramSchools.map((school) => {
            return {
              programId: school.programSchool.program.id,
              schoolId: school.programSchool.school.id,
              startDate: school.startDate,
              endDate: school.endDate,
              programType: school.programSchool.program.programType.id,
            }
          })
        : [],
      userPositions: props.resume?.userPositions.length
        ? props.resume.userPositions.map((position) => {
            return {
              companyId: position.company.id,
              positionId: position.id,
              startDate: position.startDate,
              endDate: position.endDate,
              description: position.description,
            }
          })
        : [],
      employmentId: props.resume?.employment
        ? props.resume.employment.id
        : null,
      specializationId: props.resume?.specialization
        ? props.resume.specialization.id
        : null,
      formatId: props.resume ? props.resume.formatId : null,
      position: props.resume?.position ? props.resume.position.name : '',
      languageLevels: props.resume?.languageLevels.length
        ? props.resume.languageLevels.map((language) => {
            return {
              levelId: language.level.id,
              languageId: language.language.id,
            }
          })
        : [],
      skills: props.resume?.skills.length
        ? props.resume.skills.map((s) => s.name).join(', ')
        : '',
      cityId: props.resume?.user ? props.resume.user.city.name : '',
    }
  })

  const validationSchema = computed(() => {
    return {
      position: 'required',
      specializationId: 'required',
      skills: 'required',
      employmentId: 'required',
      formatId: 'required',
    }
  })

  const {
    values: form,
    validate,
    setFieldValue,
    errors,
  } = useForm<Form>({
    initialValues: initialValues.value,
    validationSchema,
  })

  function handleForm(field: 'programSchools' | 'userPositions' | 'languageLevels', index: number, value: any): void {
    const newVal = cloneDeep(form[field])
    newVal.splice(index, 1, value)
    setFieldValue(field, newVal, false)
  }

  function handleAddBaseProgramSchool() {
    setFieldValue(
      'programSchools',
      [
        ...form.programSchools,
        {
          programId: '',
          schoolId: null,
          startDate: null,
          endDate: null,
          programType: null,
        },
      ],
      false,
    )
  }

  function handleAddBaseUserPositions() {
    setFieldValue('userPositions', [
      ...form.userPositions,
      {
        companyId: null,
        positionId: null,
        startDate: null,
        endDate: null,
        description: null,
      },
    ])
  }

  function handleAddBaseLanguageLevels() {
    setFieldValue('languageLevels', [
      ...form.languageLevels,
      {
        levelId: null,
        languageId: null,
      },
    ])
  }

  async function isValid() {
    let { valid } = await validate()

    if(!!form.programSchools.length) {
      const promises = resumeSchoolForms.value.map(formRef => formRef?.validate());
      const results = await Promise.all(promises);
      const allFormsValid = results.every(result => result.formValid);

      valid = valid && allFormsValid
    }

    if(!!form.userPositions.length) {
      const promises = resumeWorkForms.value.map(formRef => formRef?.validate());
      const results = await Promise.all(promises);
      const allFormsValid = results.every(result => result.formValid);

      valid = valid && allFormsValid
    }

    if(!!form.languageLevels.length) {
      const promises = resumeLanguageForms.value.map(formRef => formRef?.validate());
      const results = await Promise.all(promises);
      const allFormsValid = results.every(result => result.formValid);

      valid = valid && allFormsValid
    }


    return valid
  }

  async function submit() {
    if (await isValid()) {
      const _form = cloneDeep(form)

      const _skill = (form.skills as string).split(',').map(skill => skill.trim());
      _form['skills'] = Array.isArray(_skill) ? _skill : (form.skills)
      $emit('submit', _form)
    }}

</script>

<style scoped lang="scss">
  .resume-form {
    @apply flex flex-col w-full h-full gap-y-5;
  }
</style>

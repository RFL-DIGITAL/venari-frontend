<template>
  <div class="hr-vacancy-form">
    <div class="w-7/12 flex flex-col gap-y-5">
      <div>
        <p class="form-label">Название (должность)*</p>
        <BaseInputWithValidation
          white
          label="Введите название"
          name="positionName"
        />
      </div>

      <div>
        <p class="form-label">Отдел (подразделение) компании</p>
        <BaseSelectWithValidation
          :options="filters?.departments"
          label="Выберите отдел (подразделение)"
          name="departmentId"
        />
      </div>

      <div>
        <p class="form-label">Специализация</p>
        <BaseSelectWithValidation
          :options="filters?.specializations"
          label="Выберите специализацию"
          name="specializationId"
        />
      </div>

      <div>
        <p class="form-label">Регион поиска</p>
        <BaseInputWithValidation
          white
          label="Введите регион поиска"
          name="cityId"
        />
      </div>

      <div>
        <p class="form-label">Заработная плата</p>

        <div class="flex gap-x-5">
          <BaseNumberInputWithValidation
            white
            label="Введите нижнее значение"
            name="lowerSalary"
          />
          <BaseNumberInputWithValidation
            white
            label="Введите верхнее значение"
            name="higherSalary"
          />
        </div>

        <div
          class="text-xs text-gray py-[15px] border-b border-extra-light-gray"
        >
          Если заполнить только одно поле, в вакансии отобразиться только «от»
          или «до», в соответствии с заполненным полем. Если оставить поле
          пустым, то заработная плата в вакансии указана не будет
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col gap-y-5 mt-[30px]">
      <div>
        <p class="form-label">Обязанности*</p>
        <BaseTextAreaWithValidation
          label="Опишите обязанности, которые должен выполнять сотрудник "
          name="responsibilities"
        />
      </div>

      <div>
        <p class="form-label">Требования*</p>
        <BaseTextAreaWithValidation
          label="Опишите требования, которым должен соответствовать сотрудник"
          name="requirements"
        />
      </div>

      <div>
        <p class="form-label">Условия*</p>
        <BaseTextAreaWithValidation
          label="Опишите условия работы"
          name="conditions"
        />
      </div>

      <BaseCheckbox
        label="Требуется дополнительное поле"
        v-model="isNeedAdditional"
      />

      <div class="w-7/12" v-if="isNeedAdditional">
        <p class="form-label">Название дополнительного поля</p>
        <BaseInputWithValidation
          white
          label="Введите название"
          name="additionalTitle"
        />
      </div>

      <div
        class="pb-[15px] border-b border-extra-light-gray"
        v-if="isNeedAdditional"
      >
        <p class="form-label">Содержание дополнительного поля</p>
        <BaseTextAreaWithValidation label="Введите текст" name="additional" />
      </div>

      <div class="w-7/12">
        <p class="form-label">Ключевые навыки</p>
        <BaseInputWithValidation
          white
          label="Перечислите основные навыки и технологии"
          name="skills"
        />
        <div class="text-xs text-gray mt-[15px]">
          Для разделения используйте запятую
        </div>
      </div>

      <div>
        <p class="form-label">Опыт работы</p>
        <BaseSelectButtonWithValidation
          name="experienceId"
          :options="filters?.experiences"
        />
      </div>

      <div>
        <p class="form-label">Занятость</p>
        <BaseSelectButtonWithValidation
          name="employmentId"
          :options="filters?.employments"
        />
      </div>

      <div>
        <p class="form-label">Формат</p>
        <BaseSelectButtonWithValidation
          name="formatId"
          :options="filters?.formats"
        />
      </div>

      <BaseCheckbox label="Требуется выполнение задания" v-model="isNeedTest" />

      <div v-if="isNeedTest">
        <p class="form-label">Задание</p>
        <BaseTextAreaWithValidation
          label="Опишите задачу или приложите ссылку"
          name="test"
        />
      </div>
    </div>
  </div>

  <div class="flex justify-center w-full gap-x-[15px] mt-[30px] mb-5 h-[38px]">
    <BaseButton label="Опубликовать вакансию" @click="submit" />
    <SecondButton label="Сохранить в архив" @click="save" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useForm } from 'vee-validate'
  import { CreateVacancyRequest, HrVacancy } from '@/stores/types/schema'
  import { cloneDeep, split } from 'lodash'

  // Store
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  interface Form extends CreateVacancyRequest {}

  interface Props {
    vacancy: HrVacancy
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'submit', value: Form): void
    (e: 'save', value: Form): void
  }>()

  const { filters } = storeToRefs(useHrStore())

  const isNeedTest = ref(!!props.vacancy?.test)
  const isNeedAdditional = ref(
    !!(props.vacancy?.additional || props.vacancy?.additionalTitle),
  )

  const initialValues = computed<Form>(() => {
    return {
      positionName: props.vacancy?.position?.name ?? null,
      departmentId: props.vacancy?.departmentId ?? null,
      specializationId: props.vacancy?.specializationId ?? null,
      cityId: props.vacancy?.city?.name ?? null,
      lowerSalary: props.vacancy?.lowerSalary ?? null,
      higherSalary: props.vacancy?.higherSalary ?? null,
      responsibilities: props.vacancy?.responsibilities ?? null,
      requirements: props.vacancy?.requirements ?? null,
      conditions: props.vacancy?.conditions ?? null,
      additional: props.vacancy?.additional ?? null,
      additionalTitle: props.vacancy?.additionalTitle ?? null,
      skills: props.vacancy?.skills?.map((s) => s.name) ?? '',
      experienceId: props.vacancy?.experienceId ?? null,
      employmentId: props.vacancy?.employmentId ?? null,
      formatId: props.vacancy?.formatId ?? null,
      test: props.vacancy?.test ?? null,
      statusId: props.vacancy?.statusId ?? null,
    } as Form
  })

  const validationSchema = computed(() => {
    return {
      positionName: 'required',
      departmentId: '',
      specializationId: '',
      cityId: '',
      lowerSalary: '',
      higherSalary: '',
      responsibilities: 'required',
      requirements: 'required',
      conditions: 'required',
      additionalTitle: isNeedAdditional.value ? 'required' : '',
      additional: isNeedAdditional.value ? 'required' : '',
      skills: 'required',
      experienceId: 'required',
      employmentId: 'required',
      formatId: 'required',
      test: isNeedTest.value ? 'required' : '',
    }
  })

  const { values: form, validate, errors } = useForm<Form>({
    initialValues: initialValues.value,
    validationSchema,
  })

  async function isValid() {
    const { valid } = await validate()

    return valid
  }

  async function save() {
    if (await isValid()) {
      const _form = cloneDeep(form)

      _form['statusId'] = 3
      const _skill = (form.skills as string).split(',').map(skill => skill.trim());
      _form['skills'] = Array.isArray(_skill) ? _skill : (form.skills)

      $emit('save', _form)
    } else console.log(errors)
  }

  async function submit() {
    if (await isValid()) {
      const _form = cloneDeep(form)

      _form['statusId'] = 1
      const _skill = (form.skills as string).split(',').map(skill => skill.trim());
      _form['skills'] = Array.isArray(_skill) ? _skill : (form.skills)

      $emit('submit', _form)
    }
  }
</script>

<style scoped lang="scss">
  .form-label {
    @apply text-base font-bold text-gray mb-[7px];
  }
</style>

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
          label="Выберите отдел (подразделение)"
          name="departmentId"
        />
      </div>

      <div>
        <p class="form-label">Специализация</p>
        <BaseSelectWithValidation
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
          <BaseInputWithValidation
            white
            label="Введите нижнее значение"
            name="lowerSalary"
          />
          <BaseInputWithValidation
            white
            label="Введите верхнее значение"
            name="upperSalary"
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

    <div class="w-full flex flex-col gap-y-5">
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
        <SelectButtonWithValidation name="experienceId" />
      </div>

      <div>
        <p class="form-label">Занятость</p>
        <SelectButtonWithValidation name="employmentId" />
      </div>

      <div>
        <p class="form-label">Формат</p>
        <SelectButtonWithValidation name="formatId" />
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

  <div class="flex justify-center w-full gap-x-[15px] mt-[30px] pb-5">
    <BaseButton label="Опубликовать вакансию" @click="submit" />
    <SecondButton label="Сохранить как черновик" @click="save" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useForm } from 'vee-validate'
  import { CreateVacancyRequest, HrVacancy } from '@/stores/types/schema'

  interface Form extends CreateVacancyRequest {}

  interface Props {
    vacancy: HrVacancy
  }

  const props = defineProps<Props>()

  const isNeedTest = ref(false)
  const isNeedAdditional = ref(false)

  const initialValues = computed<Form>(() => {
    return {
      positionName: props.vacancy?.position?.name ?? null,
      departmentId: props.vacancy?.position?.name ?? null,
      specializationId: props.vacancy?.position?.name ?? null,
      cityId: props.vacancy?.position?.name ?? null,
      lowerSalary: props.vacancy?.position?.name ?? null,
      upperSalary: props.vacancy?.position?.name ?? null,
      responsibilities: props.vacancy?.position?.name ?? null,
      requirements: props.vacancy?.position?.name ?? null,
      conditions: props.vacancy?.position?.name ?? null,
      additional: props.vacancy?.position?.name ?? null,
      additionalTitle: props.vacancy?.position?.name ?? null,
      skills: props.vacancy?.position?.name ?? '',
      experienceId: props.vacancy?.position?.name ?? null,
      employmentId: props.vacancy?.position?.name ?? null,
      formatId: props.vacancy?.position?.name ?? null,
      test: props.vacancy?.position?.name ?? null,
      statusId: props.vacancy?.position?.name ?? null,
      image: props.vacancy?.position?.name ?? null,
    } as Form
  })

  const validationSchema = computed(() => {
    return {
      positionName: 'required',
      departmentId: 'required',
      specializationId: 'required',
      cityId: 'required',
      lowerSalary: 'required',
      upperSalary: 'required',
      responsibilities: 'required',
      requirements: 'required',
      conditions: 'required',
      additional: 'required',
      additionalTitle: 'required',
      skills: 'required',
      experienceId: 'required',
      employmentId: 'required',
      formatId: 'required',
      test: 'required',
      statusId: 'required',
      image: 'required',
    }
  })

  const { values: form, validate } = useForm<Form>({
    initialValues,
    validationSchema,
  })

  async function isValid() {
    const { valid } = await validate()

    return valid
  }

  async function save() {
    if (await isValid()) {
      console.log(form)
    }
  }

  async function submit() {
    if (await isValid()) {
      console.log(form)
    }
  }
</script>

<style scoped lang="scss">
  .form-label {
    @apply text-base font-bold text-gray mb-[7px];
  }
</style>

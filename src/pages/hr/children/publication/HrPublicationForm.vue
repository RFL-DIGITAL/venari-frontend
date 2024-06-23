<template>
  <div class="grid grid-cols-12 w-full h-full grow">
    <div class="publication-form col-span-9">
      <div>
        <p class="text-base font-bold text-gray mb-[7px]">
          Заголовок публикации
        </p>
        <BaseInputWithValidation
          white
          label="Заголовок публикации"
          name="specializationId"
        />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Категория</p>
        <BaseSelectWithValidation
          white
          :options="filters?.specializations"
          label="Выберите категория"
          name="specializationId"
        />
      </div>

      <div class="w-6/12">
        <p class="text-base font-bold text-gray mb-[7px]">Срок публикации</p>
        <BaseInputWithValidation
          white
          label="Срок публикации"
          name="specializationId"
        />
      </div>

      <div>
        <SecondSplitButton
          label="Добавить блок"
          leftIcon="icon-[outlined/plus]"
          :options="stageOptions"
          @click="handleAddBlock"
        />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Поздаголовок</p>
        <BaseInputWithValidation
          white
          label="Перечислите основные навыки и технологии"
          name="specializationId"
        />
      </div>
    </div>

    <div class="flex flex-col gap-y-5 col-span-12 mt-5">
      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Текстовый блок</p>
        <BaseTextAreaWithValidation
          white
          label="Расскажите о себе"
          name="specializationId"
        />
      </div>

      <div class="flex items-center gap-x-[25px]">
        <p class="text-base font-bold text-gray">Изображение</p>
        <SecondButton
          label="Добавить слоты для интервью"
          leftIcon="icon-[outlined/plus]"
        />
      </div>

      <div>
        <div class="flex items-center gap-x-[25px]">
          <p class="text-base font-bold text-gray">Слайдер с изображениями</p>
          <SecondButton
            label="Добавить слоты для интервью"
            leftIcon="icon-[outlined/plus]"
          />
        </div>
        <p class="text-xs text-gray mt-2">
          Выберите несколько изображений для загрузки, удерживая клавиши Shift
          или Control/Command
        </p>
      </div>

      <div class="mt-[5px]">
        <div
          class="flex justify-center w-full gap-x-[15px] mt-[30px] mb-5 h-[38px]"
        >
          <BaseButton label="Опубликовать" @click="submit" />
          <SecondButton label="Предпросмотр" @click="preview" />
        </div>
        <p class="text-xs text-gray mt-2 text-center">
          Статья будет опубликована или запланирована к публикации
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Core
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useForm } from 'vee-validate'

  // Types
  import { CreateVacancyRequest, Post } from '@/stores/types/schema'

  // Store
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  interface Form {
    a: number
  }

  interface Props {
    publication: Post
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'submit', value: Form): void
    (e: 'save', value: Form): void
  }>()

  const { filters } = storeToRefs(useHrStore())

  function handleAddBlock() {}

  const stageOptions = [
    {
      label: 'Подзаголовок',
      command: () => null,
    },
    {
      label: 'Текстовый блок',
      command: () => null,
    },
    {
      label: 'Изображение',
      command: () => null,
    },
    {
      label: 'Слайдер с изображениями',
      command: () => null,
    },
  ]

  function submit() {}

  function preview() {}
</script>

<style scoped lang="scss">
  .publication-form {
    @apply flex flex-col w-full h-full gap-y-5;
  }
</style>

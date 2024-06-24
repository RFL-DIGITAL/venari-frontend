<template>
  <div class="grid grid-cols-12 w-full h-full grow">
    <div class="publication-form col-span-12">
      <div class="col-span-9">
        <p class="text-base font-bold text-gray mb-[7px]">
          Заголовок публикации
        </p>
        <BaseInputWithValidation
          white
          label="Заголовок публикации"
          name="title"
        />
      </div>

      <div class="col-span-9">
        <p class="text-base font-bold text-gray mb-[7px]">Категория</p>
        <BaseSelectWithValidation
          white
          :options="filters?.categories"
          label="Выберите категория"
          name="categoryId"
        />
      </div>

      <!-- <div class="w-6/12">
        <p class="text-base font-bold text-gray mb-[7px]">Срок публикации</p>
        <BaseInputWithValidation
          white
          label="Срок публикации"
          name="specializationId"
        />
      </div> -->

      <div
        class="mb-2.5 border-b-2 border-extra-light-gray w-full col-span-12"
      />

      <template v-for="(part, index) in form.postParts">
        <div class="col-span-12" v-if="part.type === 'heading'">
          <p class="text-base font-bold text-gray mb-[7px]">Поздаголовок</p>
          <BaseInput
            white
            label="Перечислите основные навыки и технологии"
            :model-value="form.postParts[index].content"
            @update:model-value="val => handleForm(index, val)"
          />
        </div>

        <div class="col-span-12" v-if="part.type === 'text'">
          <p class="text-base font-bold text-gray mb-[7px]">Текстовый блок</p>
          <BaseTextArea
            white
            label="Расскажите о себе"
            :model-value="form.postParts[index].content"
            @update:model-value="val => handleForm(index, val)"
          />
        </div>

        <div
          class="flex items-center gap-x-[25px] col-span-12"
          v-if="part.type === 'imageBlock'"
        >
          <p class="text-base font-bold text-gray">Изображение</p>
          <SecondButton
            label="Загрузить изображение"
            leftIcon="icon-[outlined/plus]"
          />
        </div>

        <!-- <div class="col-span-12">
          <div class="flex items-center gap-x-[25px]">
            <p class="text-base font-bold text-gray">Слайдер с изображениями</p>
            <SecondButton
              label="Загрузить изображения"
              leftIcon="icon-[outlined/plus]"
            />
          </div>
          <p class="text-xs text-gray mt-2">
            Выберите несколько изображений для загрузки, удерживая клавиши Shift
            или Control/Command
          </p>
        </div> -->
      </template>
      <div class="col-span-9">
        <SecondSplitButton
          label="Добавить блок"
          leftIcon="icon-[outlined/plus]"
          :options="stageOptions"
        />
      </div>

      <div class="mt-[5px] col-span-12">
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
  import { cloneDeep } from 'lodash'
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useForm } from 'vee-validate'

  // Types
  import {
    CreateVacancyRequest,
    HrPublicationBodyRequest,
    Post,
  } from '@/stores/types/schema'

  // Store
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  interface Form extends HrPublicationBodyRequest {}

  interface Props {
    publication: Post
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'submit', value: Form): void
    (e: 'save', value: Form): void
  }>()

  const { filters } = storeToRefs(useHrStore())

  const initialValues = computed<Form>(() => {
    return {
      title: props.publication ? props.publication.title : '',
      postParts: props.publication
        ? props.publication.parts.map((part) => {
            return {
              type: part.contentType,
              order: part.order,
              content: part.content?.name || part.images,
            }
          })
        : [],
    }
  })

  const validationSchema = computed(() => {
    return {
      title: 'required',
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

  function handleAddBlock(type: 'heading' | 'text' | 'imageBlock') {
    setFieldValue(
      'postParts',
      [
        ...form.postParts,
        {
          type: type,
          order: form.postParts.length + 2,
          content: type === 'imageBlock' ? [] : null,
        },
      ],
      false,
    )
  }

  const stageOptions = [
    {
      label: 'Подзаголовок',
      command: () => handleAddBlock('heading'),
    },
    {
      label: 'Текстовый блок',
      command: () => handleAddBlock('text'),
    },
    {
      label: 'Изображение',
      command: () => handleAddBlock('imageBlock'),
    },
    /*     {
      label: 'Слайдер с изображениями',
      command: () => null,
    }, */
  ]

  async function isValid() {
    let { valid } = await validate()
  
    return valid
  }
    
  function handleForm(index: number, value: any): void {
    const newVal = cloneDeep(form['postParts'])
    newVal[index].content = value

    setFieldValue('postParts', newVal, false)
  }

  async function submit() {
    if(await isValid()) {
      $emit('submit', form)
    }
  }

  function preview() {}
</script>

<style scoped lang="scss">
  .publication-form {
    @apply grid grid-cols-12 w-full h-full gap-y-5;
  }
</style>

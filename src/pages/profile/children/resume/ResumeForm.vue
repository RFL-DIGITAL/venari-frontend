<template>
  <div class="grid grid-cols-12 w-full h-full grow">
    <div class="resume-form col-span-9">
      <div class="grow">
        <p class="text-base font-bold text-gray mb-[7px]">Желаемая должность</p>
        <BaseInputWithValidation
          white
          class="w-full"
          label="Желаемая должность"
        />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">
          Специализация должности
        </p>
        <BaseSelectWithValidation label="Выберите специализацию" />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Город проживания</p>
        <BaseInputWithValidation
          white
          class="w-full"
          label="Город проживания"
        />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Желаемый доход</p>
        <div class="max-w-[265px]">
          <BaseInputWithValidation
            white
            class="w-full"
            label="Желаемый доход"
          />
        </div>
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Занятость</p>
        <BaseSelectButtonWithValidation />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Формат</p>
        <BaseSelectButtonWithValidation />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Учебное заведение</p>
        <BaseInputWithValidation
          white
          class="w-full"
          label="Название учебного заведения"
        />
      </div>

      <div class="grid grid-cols-2 grid-rows-2 gap-5">
        <div>
          <p class="text-base font-bold text-gray mb-[7px]">
            Уровень образования
          </p>
          <BaseSelectWithValidation label="Выберите уровень" />
        </div>

        <div>
          <p class="text-base font-bold text-gray mb-[7px]">Специализация</p>
          <BaseSelectWithValidation label="Выберите уровень" />
        </div>

        <div>
          <p class="text-base font-bold text-gray mb-[7px]">Год выпуска</p>
          <BaseSelectWithValidation label="Год выпуска" />
        </div>
      </div>

      <div>
        <SecondButton
          label="Добавить ещё образование"
          leftIcon="icon-[outlined/plus]"
        />
      </div>

      <div class="mb-2.5 border-b-2 border-extra-light-gray w-full" />

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Компания</p>
        <BaseInputWithValidation
          white
          class="w-full"
          label="Название компании"
        />
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Должность</p>
        <BaseInputWithValidation
          white
          class="w-full"
          label="Должность, на которой вы работали"
        />
      </div>

      <div class="grid grid-cols-2 grid-rows-2 gap-x-5">
        <div>
          <p class="text-base font-bold text-gray mb-[7px]">
            Месяц, год начала
          </p>
          <BaseInputWithValidation white class="w-full" label="Год начала" />
        </div>

        <div>
          <p class="text-base font-bold text-gray mb-[7px]">
            Месяц, год окончания
          </p>
          <BaseInputWithValidation white class="w-full" label="Год окончания" />
        </div>

        <div class="col-span-2 text-xs text-gray mt-2">
          Если вы продолжаете работу на этом месте — оставьте поле с окончанием
          незаполненным
        </div>
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">О работе</p>
        <BaseTextAreaWithValidation label="О работе" />
        <div class="text-xs text-gray mt-2">
          Поле полностью редактируемое — вы можете удалить заданный шаблон
        </div>
      </div>

      <div class="w-[350px]">
        <SecondButton
          class="grow"
          label="Добавить ещё место работы"
          leftIcon="icon-[outlined/plus]"
        />
      </div>

      <div class="grid grid-cols-2 grid-rows-2 gap-5">
        <div>
          <p class="text-base font-bold text-gray mb-[7px]">Язык</p>
          <BaseInputWithValidation white class="w-full" label="Язык" />
        </div>

        <div>
          <p class="text-base font-bold text-gray mb-[7px]">Уровень</p>
          <BaseInputWithValidation
            white
            class="w-full"
            label="Выберите уровень"
          />
        </div>

        <div class="w-fit h-[44px]">
          <SecondButton label="Добавить язык" leftIcon="icon-[outlined/plus]" />
        </div>
      </div>

      <div>
        <p class="text-base font-bold text-gray mb-[7px]">Дополнительно</p>
        <BaseTextAreaWithValidation label="Расскажите о себе" />
        <div class="text-xs text-gray mt-2">
          Для разделения используйте запятую
        </div>
      </div>
      <div
        class="flex justify-center w-full gap-x-[15px] mt-[30px] mb-5 h-[38px]"
      >
        <BaseButton label="Сохранить резюме" @click="submit" />
        <SecondButton label="Заполнить позже" @click="save" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  async function save() {}

  async function submit() {}
</script>

<style scoped lang="scss">
  .resume-form {
    @apply flex flex-col w-full h-full gap-y-5;
  }
</style>

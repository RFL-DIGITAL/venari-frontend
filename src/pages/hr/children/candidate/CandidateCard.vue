<template>
  <div class="candidate-card__header">
    <div class="candidate-card__header-info">
      <div class="flex flex-col">
        <p class="text-base font-bold">Федоров Михаил Евгеньевич</p>
        <div class="flex gap-y-[5px] gap-x-[10px]">
          <span class="text-xs">21.02.1992, Мужчина</span>
          <span class="text-xs text-gray"
            >г. Кемерово, Кемеровская область, Россия</span
          >
        </div>
      </div>

      <div class="flex flex-col">
        <div class="text-sm">
          <b class="font-bold">Опыт работы: </b>
          <span>9 лет, 6 месяцев</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Регион: </b>
          <span>г. Кемерово, Кемеровская область, Россия</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Желаемая должность: </b>
          <span>Технический директор</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">E-mail: </b>
          <span>michfed@gmail.com</span>
        </div>

        <div class="text-sm">
          <b class="font-bold">Телефон: </b>
          <span>+7 (999) 888-77-66</span>
        </div>

        <div class="text-sm mt-[10px]">
          <b class="font-bold">Внутренние метки: </b>
          <Button plain text class="self-end mx-auto">
            <span class="underline text-sm text-blue">Добавить</span>
          </Button>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <img class="candidate-card__header-img" />

      <Button plain text class="self-end mx-auto mt-[30px]">
        <span class="underline text-sm text-blue">Скачать резюме</span>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .candidate-card {
    @apply w-full h-full flex flex-col /* border-b border-light-gray */ gap-y-10;

    &__header {
      @apply grid gap-x-[20px];

      grid-template-columns: auto 130px;

      &-img {
        @apply w-full aspect-square rounded-[10px] bg-gray;
      }

      &-info {
        @apply flex flex-col gap-y-[25px] my-auto;
      }

      &-logo {
        @apply mt-[30px];
      }
    }
  }
</style>

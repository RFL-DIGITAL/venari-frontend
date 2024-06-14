<template>
  <div class="cv-form">
    <div class="cv-form__header" v-if="!hideHeader">
      <img class="cv-form__header-img" />

      <div class="cv-form__header-info">
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
            <b class="font-bold">E-mail: </b>
            <span>michfed@gmail.com</span>
          </div>

          <div class="text-sm">
            <b class="font-bold">Телефон: </b>
            <span>+7 (999) 888-77-66</span>
          </div>
        </div>
      </div>

      <Image
        class="cv-form__header-logo"
        src="/public/images/logo.png"
        alt="logo"
        width="139"
      />
    </div>

    <div>
      <p class="cv-table-title">Желаемая должность</p>

      <div class="cv-table border-b-none">
        <div class="col-span-2 flex flex-col">
          <p class="text-base font-bold">Специалист по специальным специальностям</p>
          <p class="text-sm mt-2.5"><b>Специализация:</b> Программирование</p>

          <div class="flex items-center gap-x-[15px] mt-4">
            <p class="text-base">₽150.000</p>

            <div class="flex items-center gap-x-2.5">
              <Chip label="Полная занятость"/>
              <Chip label="Удаленная работа"/>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div>
      <p class="cv-table-title">Опыт работы</p>

      <div class="cv-table" v-for="i in 2" :key="i">
        <div>00.0000 — Настоящее время</div>
        <div class="flex flex-col">
          <p class="text-sm font-bold mb-2.5">Разработчик разработчиков, Lucas Software</p>

          <div class="flex flex-col gap-y-1">
            <p class="text-big-xs" v-for="i in 5" :key="i"><b>Заказчик:</b> Программирование</p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <p class="cv-table-title">Образование</p>

      <div class="cv-table" v-for="i in 2" :key="i">
        <div>7777</div>
        <div class="flex flex-col gap-y-[5px]">
          <p class="text-sm font-bold break-word">Кузбасский государственный технический университет имени Т.Ф. Горбачева</p>
          <p class="text-big-xs">Высшее, программирование</p>
        </div>
      </div>
    </div>

    <div>
      <p class="cv-table-title">Навыки и языки</p>

      <div class="cv-table">
        <div>Ключевые навыки</div>
        <div class="flex flex-wrap gap-[5px]">
          <SkillChip v-for="i in 15" :key="i" label="JavaScript"/>
        </div>
      </div>
      <div class="cv-table">
        <div>Языки</div>
        <div class="flex flex-col">
          <p class="text-big-xs" v-for="i in 5" :key="i"><b>Русский</b> — родной</p>
        </div>
      </div>
    </div>

    <div>
      <p class="cv-table-title">Дополнительно</p>

      <div class="cv-table">
        <div class="col-span-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. adipiscing elit.adipiscing
          elit.adipiscin...Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. adipiscing elit.adipiscing
          elit.adipiscin...
        </div>
      </div>

      <div class="text-xs font-medium text-gray text-center mt-2.5 pb-4">
        Обновлено 17 июня 2024
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    hideHeader: boolean
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .cv-form {
    @apply w-full h-full flex flex-col /* border-b border-light-gray */ gap-y-10;

    &__header {
      @apply grid gap-x-[20px];

      grid-template-columns: 130px auto 140px;

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

    .cv-table-title {
      @apply text-sm font-bold text-blue pb-[5px];
    }

    .cv-table {
      @apply grid border-y border-light-gray border-collapse;
      grid-template-columns: 39% 61%;

      &:nth-child(n + 3) {
        border-top: none;
      }

      & > div {
        @apply py-5 ;
      }

      & > div:nth-child(odd):not(.col-span-2) {
        @apply text-xs text-gray;
      }

      & > div:nth-child(even) {
        @apply border-l border-light-gray pl-5 pr-10;
      }
    }
  }
</style>

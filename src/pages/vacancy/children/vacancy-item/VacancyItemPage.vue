<template>
  <div class="vacancy-item">
    <div class="vacancy-item__main">
      <div class="vacancy-item__card-container">
        <div class="flex flex-col gap-y-[10px]">
          <p class="text-lg">Специалист по специальным специальностям</p>
          <p class="text-sm">Отдел по отделениям отделов в отделах</p>
          <p class="text-sm text-gray">г. Кемерово</p>
        </div>
        <div class="flex items-center gap-x-[20px]">
          <p class="text-base font-bold text-blue">₽150.000</p>

          <div class="flex gap-x-[10px]">
            <Chip label="Полная занятость" />
            <Chip label="Опыт от 1 года" />
          </div>
        </div>
      </div>

      <div class="vacancy-item__card-container">
        <div>
          <p class="text-base font-bold mb-[15px]">Обязанности:</p>
          <ul class="list-disc list-inside">
            <li class="text-sm" v-for="i in 5" ::key="i">авыфавфыафывавыф</li>
          </ul>
        </div>

        <div>
          <p class="text-base font-bold mb-[15px]">Требования:</p>
          <ul class="list-disc list-inside">
            <li class="text-sm" v-for="i in 5" ::key="i">авыфавфыафывавыф</li>
          </ul>
        </div>

        <div>
          <p class="text-base font-bold mb-[15px]">Дополнительно:</p>
          <ul class="list-disc list-inside">
            <li class="text-sm" v-for="i in 5" ::key="i">авыфавфыафывавыф</li>
          </ul>
        </div>
      </div>

      <div class="vacancy-item__card-container">
        <p class="text-base font-bold mb-[15px]">Обязанности:</p>

        <div class="flex flex-wrap gap-[10px]">
          <div
            class="rounded-[10px] bg-extra-light-gray text-sm py-[10px] px-[15px]"
            v-for="i in 20"
            :key="i"
          >
            JavaScript
          </div>
        </div>
      </div>

      <div class="flex justify-center w-full gap-x-[10px]">
        <BaseButton label="Откликнуться" />
        <SecondButton class="!bg-white" label="Сообщение работодателю" />
      </div>
    </div>
    <div class="vacancy-item__sidebar">
      <div class="vacancy-item__card-container gap-y-[30px]">
        <SmallUserCard />

        <div class="flex flex-col gap-y-[20px]">
          <p class="text-sm">
            Мы создаем что-то наерное создаем текст Lorem ipsum dolor sit amet,
            consectetur adipiscing elit Мы создаем что-то наерное создаем текст
            Lorem ipsum dolor sit amet, consectetur adipiscing elitМы создаем
            что-то наерное создаем текст Lorem ipsum dolor sit
          </p>

          <p class="text-sm text-gray">
            Россия, Кемеровская область — Кузбасс, г. Кемерово, Бакинский
            переулок, 15
          </p>
        </div>

        <div class="flex w-full gap-x-[10px]">
          <BaseButton label="Откликнуться" />
          <SecondButton class="!bg-white" label="Сообщение работодателю" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .vacancy-item {
    @include page-container-main-left;
    padding-bottom: 10vh;

    &__main,
    &__sidebar {
      @apply flex flex-col gap-y-[25px];
    }
  }

  .vacancy-item__card-container {
    @apply bg-white rounded-[15px] w-full flex flex-col p-[30px];
  }
</style>

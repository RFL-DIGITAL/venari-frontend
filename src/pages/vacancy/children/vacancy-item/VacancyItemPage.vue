<template>
  <AppMobileHeader hide-notification>
    <SecondRouterLink to="/vacancy" title="К вакансиям" />
  </AppMobileHeader>

  <div class="vacancy-item">
    <div class="vacancy-item__main">
      <div class="vacancy-item__card-container">
        <div class="flex flex-col sm:gap-y-[10px] gap-y-[5px]">
          <p class="text-lg">Специалист по специальным специальностям</p>
          <p class="text-sm">Отдел по отделениям отделов в отделах</p>
          <p class="text-sm text-gray">г. Кемерово</p>
        </div>
        <div class="sm:flex items-center gap-x-[20px]">
          <p class="text-base font-bold text-blue sm:mt-0 mt-[15px]">₽150.000</p>

          <div class="flex gap-x-[10px] sm:mt-0 mt-[15px]">
            <Chip label="Полная занятость" />
            <Chip label="Опыт от 1 года" />
          </div>
        </div>

        <BaseButton class="sm:hidden block w-fit mt-[15px]" label="Откликнуться" />
      </div>

      <div class="vacancy-item__card-container gap-y-[15px]">
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
            class="rounded-[10px] bg-extra-light-gray sm:text-sm text-xs py-[10px] sm:px-[15px] px-[10px]"
            v-for="i in 20"
            :key="i"
          >
            JavaScript
          </div>
        </div>
      </div>

      <div class="sm:flex hidden justify-center w-full gap-x-[10px]">
        <BaseButton label="Откликнуться" />
        <SecondButton class="!bg-white" label="Сообщение работодателю" />
      </div>
    </div>
    
    <div class="vacancy-item__sidebar">
      <div class="vacancy-item__card-container sm:gap-y-[30px] gap-y-[15px]">
        <SmallUserCard />

        <div class="flex flex-col gap-y-[20px]">
          <p class="sm:text-sm text-xs">
            Мы создаем что-то наерное создаем текст Lorem ipsum dolor sit amet,
            consectetur adipiscing elit Мы создаем что-то наерное создаем текст
            Lorem ipsum dolor sit amet, consectetur adipiscing elitМы создаем
            что-то наерное создаем текст Lorem ipsum dolor sit
          </p>

          <p class="sm:text-sm text-xs text-gray">
            Россия, Кемеровская область — Кузбасс, г. Кемерово, Бакинский
            переулок, 15
          </p>
        </div>

        <div class="flex w-full gap-x-[10px]">
          <BaseButton label="Откликнуться" />
          <SecondButton class="!bg-white" label="Сообщение работодателю" />
        </div>
      </div>

      <div class="vacancy-item__sidebar__image">
          <img src="/images/post.png" alt="logo"/>
          <p>Размещено 17 июня 2024</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SecondRouterLink from '@/components/common/SecondRouterLink.vue'
</script>

<style scoped lang="scss">
  .vacancy-item {
    @include page-container-main-left;

    &__main,
    &__sidebar {
      @apply flex flex-col sm:gap-y-[25px];
    }

    &__sidebar__image {
      @apply flex flex-col w-full h-full;

      img {
        @apply aspect-square rounded-[10px] sm:w-full sm:mx-0 sm:mb-[15px] m-[15px];
        
        @media (max-width: 1024px) {
          width: calc(100% - 30px) 
        }
      }

      p {
        @apply text-sm text-gray sm:text-left text-center;
      }
    }
  }

  .vacancy-item__card-container {
    @apply bg-white rounded-[15px] w-full flex flex-col p-[30px];

    @media (max-width: 1024px) {
      width: calc(100% - 30px);
      @apply p-[15px] m-[15px] mb-0 mx-auto;
      box-shadow: 4px 4px 44px 0px rgba(90, 90, 90, 0.25);
    }
  }
</style>

<template>
  <div class="vacancy-item">
    <div class="vacancy-item__main">
      <div class="vacancy-item__card-container">
        <div class="flex flex-col gap-y-[10px]">
          <p class="text-lg">Специалист по специальным специальностям</p>
          <p class="text-sm">Отдел по отделениям отделов в отделах</p>
          <p class="text-sm text-gray">г. Кемерово</p>
        </div>
        <div class="flex gap-y-[20px]">
          <p class="text-base font-bold text-blue">₽150.000</p>

          <div class="flex gap-y-[10px]">
            <Chip label="Полная занятость" />
            <Chip label="Опыт от 1 года" />
          </div>
        </div>
      </div>
    </div>
    <div class="vacancy-item__sidebar"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .vacancy-item {
    @include page-container-main-left;
    padding-bottom: 10vh;
  }

  .vacancy-item__card-container {
    @apply bg-white rounded-[15px] w-full h-full flex flex-col p-[30px];

    &__header {
    }
  }
</style>

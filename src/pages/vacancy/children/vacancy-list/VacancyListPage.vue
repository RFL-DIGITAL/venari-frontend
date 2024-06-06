<!-- TODO: Жду шрифты -->
<template>
    <div class="vacancy-page">
      <div class="vacancy-page__sidebar">
        <div
          class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]"
        >
          ФИЛЬТРЫ
        </div>
      </div>
  
      <div class="vacancy-page__container">
          <Vacancy/>
          <Vacancy/>
          <Vacancy/>
          <Vacancy/>
          <Vacancy/>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { useRoute } from 'vue-router'
  
    const $route = useRoute()
  </script>
  
  <style scoped lang="scss">
    .vacancy-page {
      @apply w-full h-full grid gap-x-[25px] pb-10;
      grid-template-columns: 1fr 2fr;
  
      &__container {
        @apply flex flex-col w-full h-full gap-y-[25px];
      }
    }
  </style>
  
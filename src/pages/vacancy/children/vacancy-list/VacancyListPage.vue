<!-- TODO: Жду шрифты -->
<template>
  <div class="vacancy-page">
    <PageTitle title="Вакансии" description="Найдите работу мечты и станьте частью большой корпоративной семьи"/>

    <div class="vacancy-page__sidebar">
      <div
        class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]"
      >
        ФИЛЬТРЫ
      </div>
    </div>

    <div class="vacancy-page__container">
      <Vacancy />
      <Vacancy />
      <Vacancy />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const $route = useRoute()
</script>

<style scoped lang="scss">
  .vacancy-page {
    @include page-container-main-right;

    &__container {
      @apply flex flex-col w-full h-full gap-y-[25px];
    }
  }
</style>

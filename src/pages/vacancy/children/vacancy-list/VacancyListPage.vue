<!-- TODO: Жду шрифты -->
<template>
  <AppMobileHeader search>
    <PageTitle title="Вакансии"/>
  </AppMobileHeader>
  
  <div class="vacancy-page">
    <PageTitle class="hidden sm:block"
      title="Вакансии"
      description="Найдите работу мечты и станьте частью большой корпоративной семьи"
    />

    <div class="vacancy-page__sidebar hidden sm:block">
      <div
        class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]"
      >
        ФИЛЬТРЫ
      </div>
    </div>

    <div class="vacancy-page__container">
      <Vacancy v-for="i in 15" :key="i"/>
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
      @apply flex flex-col sm:w-full w-[100vw] h-full gap-y-[25px] sm:p-0 p-[15px];
    }
  }
</style>

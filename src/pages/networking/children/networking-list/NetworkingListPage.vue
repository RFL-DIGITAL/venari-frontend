<!-- TODO: Жду шрифты -->
<template>
  <div class="text-page-title">
    Нетворкинг
    <p class="text-sm text-gray">
      Найдите чат с единомышленниками и заведите полезные знакомства
    </p>
  </div>

  <div class="networking-page">
    <div class="networking-page__sidebar">
      <div
        class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]"
      >
        ФИЛЬТРЫ
      </div>
    </div>

    <div class="networking-page__container">
      <Networking />
      <Networking />
    </div>

    <RouterView/>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const $route = useRoute()
</script>

<style scoped lang="scss">
  .networking-page {
    @apply w-full h-full grid gap-x-[25px] pb-10;
    grid-template-columns: 1fr 2fr;

    &__container {
      @apply flex flex-col w-full h-full gap-y-[25px];
    }
  }
</style>

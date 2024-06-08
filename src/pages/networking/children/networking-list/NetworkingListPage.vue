<!-- TODO: Жду шрифты -->
<template>
  <div class="networking-page">
    <PageTitle title="Нетворкинг" description="Найдите чат с единомышленниками и заведите полезные знакомства"/>

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

    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const $route = useRoute()
</script>

<style scoped lang="scss">
  .networking-page {
    @include page-container-main-right;

    &__container {
      @apply flex flex-col w-full h-full gap-y-[25px];
    }
  }
</style>

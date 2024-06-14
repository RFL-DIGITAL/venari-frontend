<template>
  <div class="hr-candidate-page">
    <HrSidebar>
      <template #header>
        <BaseSearch v-model="_search" class="!w-full" />
      </template>

      <template #body>
        <div class="flex flex-col gap-y-[10px] mt-[30px]">
          <span class="w-full border-b border-white text-white text-sm pb-[7px]">Все кандидаты</span>
          <span class="w-full border-b border-white text-white text-sm pb-[7px]">Отклики</span>
          <span class="w-full border-b border-white text-white text-sm pb-[7px]">Кандидаты</span>
          <span class="w-full border-b border-white text-white text-sm pb-[7px]">Первичное интервью</span>
          <span class="w-full border-b border-white text-white text-sm pb-[7px]">Отправить тестовое задание</span>
          <span class="w-full border-b border-white text-white text-sm pb-[7px]">Выполнили тестовое</span>
          <span class="w-full border-b border-white text-white text-sm pb-[7px]">Техническое интервью</span>
          <span class="w-full border-b border-white text-white text-sm pb-[7px]">Оффер</span>
          <span class="w-full border-b border-white text-white text-sm pb-[7px]">Отказы</span>
        </div>
      </template>
    </HrSidebar>

    <div class="mt-5">
      <p class="title-small max-w-[300px]">
        Выберите категорию в списке или начините поиск кандидатов среди всех
        пользователей
      </p>

      <BaseButton
        class="mt-5"
        label="Найти кандидата"
        leftIcon="icon-[outlined/search]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const _search = ref()
</script>

<style scoped lang="scss">
  .hr-candidate-page {
    max-height: 100dvh;
    @include page-hr-container;
  }
</style>

<template>
  <div class="hr-candidate-page">
    <HrSidebar>
      <template #header>
        <BaseSearch v-model="_search" class="!w-full" />
      </template>

      <template #body>
        <div class="flex flex-col gap-y-[10px] mt-[30px]">
          <router-link class="flex" :to="{ name: 'hr-candidate.list', query: { stage: stage.id }}" v-for="stage in filters?.stages" :key="stage.id">
            <span class="w-full border-b border-white text-white text-sm pb-[7px]">{{ stage.name }}</span>
          </router-link>
        </div>
      </template>
    </HrSidebar>

    <div class="mt-5">
      <p class="title-small max-w-[300px]">
        Выберите категорию в списке или начините поиск кандидатов среди всех
        пользователей
      </p>

      <router-link :to="{ name: 'hr-candidate.candidates'}">
        <BaseButton
          class="mt-5"
          label="Найти кандидата"
          leftIcon="icon-[outlined/search]"
        />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { useHrStore } from '@/stores/modules/hr/hr-store'


  const _search = ref()

  const { filters } = storeToRefs(useHrStore())

</script>

<style scoped lang="scss">
  .hr-candidate-page {
    max-height: 100dvh;
    @include page-hr-container;
    @apply pb-0 mx-auto;
  }
</style>

<template>
  <div class="vacancy-preview">
    <VacancyCard v-for="vacancy in vacancies.slice(0, 5)" :key="vacancy.id" :vacancy="vacancy" />
  </div>
</template>

<script setup lang="ts">
  import { useVacancyStore } from '@/stores/modules/vacancy-store'
  import { storeToRefs } from 'pinia'

  const { vacancies } = storeToRefs(useVacancyStore())
  const { getVacancies } = useVacancyStore()

  fetchData()

  function fetchData() {
    getVacancies()
  }
</script>

<style scoped>
  .vacancy-preview {
    @apply flex flex-col gap-y-[15px];
  }
</style>

<template>
  <div class="hr-vacancy-page">
    <HrSidebar />

    <div class="hr-vacancy-page__content">
      <div class="hr-vacancy-page__content__header">
        <SelectButton />

        <div class="flex items-center gap-x-[10px]">
          <BaseButton
            label="Создать вакансию"
            leftIcon="icon-[outlined/plus]"
          />

          <SecondButton label="Выбрать" leftIcon="icon-[outlined/check-list]" />
          <SecondButton
            label="Выбрать все"
            leftIcon="icon-[outlined/success]"
          />
        </div>
      </div>

      <div class="mt-5">
        <BaseScroll
          class="hr-vacancy__scroll mr-[-15px]"
          v-if="vacancies.length"
        >
          <BaseInterceptor @intersect="handleIntersect">
            <HrVacancyTable
              :rows="vacancies"
            />
          </BaseInterceptor>
        </BaseScroll>
      </div>
    </div>
  </div>

  <HrVacancyNewVacancyDialog v-if="visible" v-model:visible="visible"/>
</template>

<script setup lang="ts">
  // Core
  import { storeToRefs } from 'pinia'
  import { watch, ref } from 'vue'
  import { useRoute } from 'vue-router'

  // Store
  import { useHrVacancyStore } from '@/stores/modules/hr/hr-vacancy-store'

  const { paginator, vacancies, filter } = storeToRefs(useHrVacancyStore())
  const { getVacancies } = useHrVacancyStore()

  const $route = useRoute()

  const visible = ref(true)

  fetchData()

  function fetchData() {
    getVacancies()
  }

  watch(
    () => filter.value,
    () => {
      fetchData()
    },
    { deep: true },
  )

  function handleIntersect() {
    console.log(1)
    /* if (filter.value.page + 1 <= paginator.value?.lastPage)
    filter.value = { ...filter.value, page: filter.value.page + 1 } */
  }
</script>

<style scoped lang="scss">
  .hr-vacancy-page {
    max-height: 100dvh;
    @include page-hr-container;
    @apply pb-0 mx-auto;

    &__content {
      @apply flex flex-col;

      &__header {
        @apply flex justify-between;
      }
    }
  }

  .hr-vacancy__scroll {
    height: calc(100dvh - 157px);
  }
</style>

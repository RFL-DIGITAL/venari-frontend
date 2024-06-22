<!-- TODO: Жду шрифты -->
<template>
  <AppMobileHeader search>
    <PageTitle title="Вакансии" />
  </AppMobileHeader>

  <div class="vacancy-page">
    <PageTitle
      class="hidden sm:block"
      title="Вакансии"
      description="Найдите работу мечты и станьте частью большой корпоративной семьи"
    />

    <div class="vacancy-page__sidebar hidden sm:block">
      <div
        class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px] gap-y-[15px]"
      >
        <div>
          <p class="text-gray text-sm font-bold mb-[7px]">Город</p>
          <BaseInput white label="Город" />
        </div>

        <div>
          <p class="text-gray text-sm font-bold mb-[7px]">Специальность</p>
          <BaseSelect white label="Специальность" />
        </div>

        <div>
          <div class="flex gap-x-5">
            <div>
              <p class="text-gray text-sm font-bold mb-[7px]">Доход от</p>
              <BaseNumberInput
                class="input-number"
                label="От"
                white
                v-model="filter.lowerSalary"
              />
            </div>

            <div>
              <p class="text-gray text-sm font-bold mb-[7px]">Доход до</p>
              <BaseNumberInput
                class="input-number"
                label="До"
                white
                v-model="filter.higherSalary"
              />
            </div>
          </div>
        </div>

        <div>
          <p class="text-gray text-sm font-bold mb-[7px]">Опыт работы</p>
          <BaseSelect white label="Любой" />
        </div>

        <div>
          <p class="text-gray text-sm font-bold mb-[7px]">Занятость</p>
          <BaseSelect white label="Любая" />
        </div>

        <div>
          <p class="text-gray text-sm font-bold mb-[7px]">Формат работы</p>
          <BaseSelect white label="Любой" />
        </div>

      </div>
    </div>

    <div class="vacancy-page__container">
      <BaseInterceptor @intersect="handleIntersect">
        <div class="flex flex-col sm:gap-y-[25px] gap-y-[15px]">
          <Vacancy
            v-for="vacancy in vacancies"
            :key="vacancy.id"
            preview
            :vacancy="vacancy"
          />
        </div>
      </BaseInterceptor>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const $route = useRoute()

  import { useVacancyStore } from '@/stores/modules/vacancy-store'
  import { storeToRefs } from 'pinia'
  import { watch } from 'vue'

  const { paginator, vacancies, filter } = storeToRefs(useVacancyStore())
  const { getVacancies } = useVacancyStore()

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
    if (filter.value.page + 1 <= paginator.value?.lastPage)
      filter.value = { ...filter.value, page: filter.value.page + 1 }
  }
</script>

<style scoped lang="scss">
  .vacancy-page {
    @include page-container-main-right;

    &__container {
      @apply flex flex-col sm:w-full w-[100vw] h-full gap-y-[25px] sm:p-0 p-[15px];
    }

    :deep(.p-inputnumber) {
      @apply w-full;
    }
  }

</style>

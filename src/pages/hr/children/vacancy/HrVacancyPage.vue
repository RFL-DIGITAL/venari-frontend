<template>
  <div class="hr-vacancy-page">
    <HrSidebar />

    <div class="hr-vacancy-page__content">
      <div class="hr-vacancy-page__content__header">
        <BaseSelectButton
          :model-value="filter.statusId"
          :options="filters?.statuses"
          @update:model-value="
            (value: number) =>
              (filter = { ...filter, statusId: value, page: 1 })
          "
        />

        <div class="flex items-center gap-x-[10px]">
          <BaseButton
            v-if="!selectionMode"
            label="Создать вакансию"
            leftIcon="icon-[outlined/plus]"
            @click="visibleCreate = true"
          />

          <BaseButton
            v-else
            label="Отменить выбор"
            leftIcon="icon-[outlined/close]"
            @click="handleStopSelecting"
          />

          <SecondButton  v-if="!selectionMode"
            label="Выбрать"
            leftIcon="icon-[outlined/check-list]"
            @click="selectionMode = !selectionMode"
          />

          <SecondButton  v-else
            label="В архив"
            leftIcon="icon-[outlined/archive]"
          />

          <SecondButton
            label="Выбрать все"
            leftIcon="icon-[outlined/success]"
            @click="handleSelectAll"
          />
        </div>
      </div>

      <div class="mt-5">
        <BaseScroll
          class="hr-vacancy__scroll mr-[-15px]"
          v-if="vacancies.length"
        >
          <BaseInterceptor @intersect="handleIntersect">
            <HrVacancyTable :rows="vacancies" @row-select="openEditDialog" :selectionMode="selectionMode" v-model:selected="selected"/>
          </BaseInterceptor>
        </BaseScroll>
      </div>
    </div>
  </div>

  <HrVacancyVacancyDialog
    v-if="visibleCreate"
    v-model:visible="visibleCreate"
  />

  <HrVacancyVacancyDialog
    v-if="visibleEdit"
    v-model:visible="visibleEdit"
    edit
    :vacancy="editableVacancy"
  />
</template>

<script setup lang="ts">
  // Core
  import { storeToRefs } from 'pinia'
  import { watch, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { HrVacancy } from '@/stores/types/schema'

  // Store
  import { useHrVacancyStore } from '@/stores/modules/hr/hr-vacancy-store'
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  const { paginator, vacancies, filter } = storeToRefs(useHrVacancyStore())
  const { filters } = storeToRefs(useHrStore())
  const { getVacancies } = useHrVacancyStore()

  const $route = useRoute()

  const visibleCreate = ref(false)
  const visibleEdit = ref(false)

  const selectionMode = ref(false)
  const selected = ref<HrVacancy[]>()

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

  const editableVacancy = ref<HrVacancy | null>(null)
  function openEditDialog(id: number) {
    editableVacancy.value = vacancies.value.find((v) => v.id === id)
    visibleEdit.value = true
  }

  function handleStopSelecting() {
    selected.value = []
    selectionMode.value = false
  }

  function handleSelectAll() {
    selectionMode.value = true
    selected.value = vacancies.value
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

<template>
  <div class="hr-vacancy-page">
    <HrSidebar>
      <template #header><span></span></template>
      <template #body>
        <div class="flex flex-col gap-y-[20px]">
          <div>
            <p class="text-sm text-white mb-[7px]">Название вакансии</p>
            <BaseInput label="Поиск" v-model="filter.name" />
          </div>

          <div>
            <p class="text-sm text-white mb-[7px]">Ответственный</p>
            <BaseSelect
              label="Все"
              :options="filters?.accountables.map((a) => a.user)"
              v-model="filter.accountableId"
            />
          </div>

          <div>
            <p class="text-sm text-white mb-[7px]">Регион поиска</p>
            <BaseInput label="Регион" v-model="filter.city" />
          </div>

          <div>
            <p class="text-sm text-white mb-[7px]">Специализация</p>
            <BaseSelect
              label="Все"
              :options="filters?.specializations"
              v-model="filter.specializationId"
            />
          </div>
        </div>
      </template>
    </HrSidebar>

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

          <SecondButton
            v-if="!selectionMode"
            label="Выбрать"
            leftIcon="icon-[outlined/check-list]"
            @click="selectionMode = !selectionMode"
          />

          <template v-else>
            <SecondButton
              v-if="filter.statusId === 1"
              label="В архив"
              leftIcon="icon-[outlined/archive]"
              @click="handleArchive"
            />

            <SecondButton
              v-else
              label="Опубликовать"
              leftIcon="icon-[outlined/succes-figure]"
              @click="handleArchive"
            />
          </template>

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
            <HrVacancyTable
              :rows="vacancies"
              @row-select="openEditDialog"
              :selectionMode="selectionMode"
              v-model:selected="selected"
            />
          </BaseInterceptor>
        </BaseScroll>
      </div>
    </div>
  </div>

  <HrVacancyVacancyDialog
    v-if="visibleCreate"
    v-model:visible="visibleCreate"
    @update:visible="(val) => (!val ? fetchData() : null)"
  />

  <HrVacancyVacancyDialog
    v-if="visibleEdit"
    v-model:visible="visibleEdit"
    edit
    :vacancy="editableVacancy"
    @update:visible="(val) => (!val ? fetchData() : null)"
  />
</template>

<script setup lang="ts">
  // Core
  import { storeToRefs } from 'pinia'
  import { watchDebounced } from '@vueuse/core'
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { HrVacancy } from '@/stores/types/schema'

  // Store
  import { useHrVacancyStore } from '@/stores/modules/hr/hr-vacancy-store'
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  const { paginator, vacancies, filter } = storeToRefs(useHrVacancyStore())
  const { filters } = storeToRefs(useHrStore())
  const { getVacancies, postArchiveVacancy, postUnarchiveVacancy } =
    useHrVacancyStore()

  const $route = useRoute()

  const visibleCreate = ref(false)
  const visibleEdit = ref(false)

  const selectionMode = ref(false)
  const selected = ref<HrVacancy[]>()

  fetchData()

  function fetchData() {
    getVacancies()
  }

  watchDebounced(
    filter.value,
    () => {
      selected.value = []
      fetchData()
    },
    { debounce: 250, maxWait: 500, deep: true },
  )

  function handleIntersect() {
    if (filter.value.page + 1 <= paginator.value?.lastPage)
      filter.value = { ...filter.value, page: filter.value.page + 1 }
  }

  async function handleArchive() {
    if (selected.value?.length) {
      if (filter.value.statusId === 1)
        await postArchiveVacancy({
          vacancyIds: selected.value?.map((s) => s.id),
        })
      else
        await postUnarchiveVacancy({
          vacancyIds: selected.value?.map((s) => s.id),
        })

      await fetchData()
    }
    selectionMode.value = false
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

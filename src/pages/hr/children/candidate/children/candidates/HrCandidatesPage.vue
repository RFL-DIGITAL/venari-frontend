<template>
  <div class="hr-candidates-page">
    <div class="relative">
      <HrSidebar>
        <template #header>
          <router-link
            class="flex gap-x-[5px] items-center"
            :to="{ name: 'hr-candidate' }"
          >
            <i
              class="w-[11px] h-[14px] text-white icon-[outlined/arrow-left]"
            />
            <p class="text-white text-sm">Назад</p>
          </router-link>
          <BaseSearch v-model="filter.name" class="!w-full mt-5 mb-[5px]" />
          <p class="text-xs text-white">
            Введите любое требование к кандидату, например, ключевой навык или
            технологию
          </p>
        </template>

        <template #body>
          <div class="flex flex-col mt-5 gap-y-5 w-full">
            <div>
              <p class="text-sm text-white mb-[7px]">Опыт работы</p>
              <BaseSelect
                :options="filters?.experiences"
                label="Любой"
                v-model="filter.experinceId"
              />
            </div>

            <div>
              <p class="text-sm text-white mb-[7px]">Регион</p>
              <BaseInput label="Любой" v-model="filter.city" />
            </div>

            <div>
              <p class="text-sm text-white mb-[7px]">Доход</p>
              <div class="flex gap-x-[2px]">
                <BaseNumberInput
                  class="input-number"
                  label="От"
                  v-model="filter.lowerSalary"
                />
                <BaseNumberInput
                  class="input-number"
                  label="До"
                  v-model="filter.higherSalary"
                />
              </div>
            </div>

            <div>
              <p class="text-sm text-white mb-[7px]">Специализация</p>
              <BaseSelect
                :options="filters?.specializations"
                label="Любой"
                v-model="filter.specializationId"
              />
            </div>

            <div>
              <p class="text-sm text-white mb-[7px]">Занятость</p>
              <BaseSelect
                :options="filters?.employments"
                label="Любой"
                v-model="filter.employmentId"
              />
            </div>

            <div>
              <p class="text-sm text-white mb-[7px]">Образование</p>
              <BaseSelect
                :options="filters?.programTypes"
                label="Любой"
                v-model="filter.programTypeId"
              />
            </div>
          </div>
        </template>
      </HrSidebar>
    </div>

    <div class="mx-auto min-w-[930px]">
      <BaseInterceptor @intersect="handleIntersect">
        <div class="flex flex-col gap-y-5">
          <CandidateMediumCard
            v-for="candidate in candidates"
            :key="candidate.id"
            :candidate="candidate"
            @resume="cvDialogVisible = true"
          />
        </div>
      </BaseInterceptor>
    </div>
  </div>

  <ProfileCvDialog v-if="cvDialogVisible" v-model:visible="cvDialogVisible" />
</template>

<script setup lang="ts">
  // Core
  import { storeToRefs } from 'pinia'
  import { watchDebounced } from '@vueuse/core'
  import { ref } from 'vue'

  // Store
  import { useHrCandidateStore } from '@/stores/modules/hr/hr-candidate-store'
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  import useNotify from '@/utils/hooks/useNotify'

  const cvDialogVisible = ref(false)

  const { notifyError } = useNotify()
  const { filters } = storeToRefs(useHrStore())
  const { paginator, candidates, filter } = storeToRefs(useHrCandidateStore())
  const { getCandidates } = useHrCandidateStore()

  fetchData()

  function fetchData() {
    getCandidates().catch(notifyError)
  }

  watchDebounced(
    filter.value,
    () => {
      fetchData()
    },
    { debounce: 250, maxWait: 500, deep: true },
  )

  function handleIntersect() {
    if (filter.value.page + 1 <= paginator.value?.lastPage)
      filter.value = { ...filter.value, page: filter.value.page + 1 }
  }
</script>

<style scoped lang="scss">
  .hr-candidates-page {
    @include page-hr-container;
    @apply pb-10 mx-auto;

    .hr-sidebar {
      @apply fixed;
    }
  }

  :deep(.p-inputnumber) {
    @apply w-[135px];
  }

  .base-input:nth-child(1).input-number {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .base-input:nth-child(2).input-number {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
</style>

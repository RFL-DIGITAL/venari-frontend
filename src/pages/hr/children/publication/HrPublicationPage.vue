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
        </template>

        <template #body>
          <div class="flex flex-col mt-5 gap-y-5 w-full">
            <div>
              <p class="text-sm text-white mb-[7px]">Категория</p>
              <BaseSelect
                :options="filters?.experiences"
                label="Любой"
                v-model="filter.experinceId"
              />
            </div>

            <div>
              <p class="text-sm text-white mb-[7px]">Дата</p>
              <BaseDatePicker label="Дата" v-model="filter.date"/>
            </div>

            <div>
              <p class="text-sm text-white mb-[7px]">Автор</p>
              <BaseSelect
                :options="filters?.experiences"
                label="Любой"
                v-model="filter.experinceId"
              />
            </div>

           </div>
        </template>
      </HrSidebar>
    </div>

    <div class="mx-auto min-w-[930px] flex flex-col">
      <BaseButton class="ml-auto mb-[15px]" label="Добавить публикацию" leftIcon="icon-[outlined/plus]"/>

      <BaseInterceptor @intersect="handleIntersect">
        <div class="flex flex-col gap-y-5">
          <HrPublicationCard
            v-for="i in 100"
            :ket="i"
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
  import { useHrPublicationStore } from '@/stores/modules/hr/hr-publication-store'
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  import useNotify from '@/utils/hooks/useNotify'

  const cvDialogVisible = ref(false)

  const { notifyError } = useNotify()
  const { filters } = storeToRefs(useHrStore())
  const { paginator, publications, filter } = storeToRefs(useHrPublicationStore())
  const { getPublications } = useHrPublicationStore()

  fetchData()

  function fetchData() {
    getPublications().catch(notifyError)
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

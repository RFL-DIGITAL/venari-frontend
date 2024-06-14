<template>
  <div class="hr-candidates-page">
    <div class="relative">
      <HrSidebar>
        <template #header>
          <router-link
            class="flex gap-x-[5px] items-center"
            :to="{ name: 'hr-candidate' }"
          >
            <i class="w-[11px] h-[14px] text-white icon-[outlined/arrow-left]" />
            <p class="text-white text-sm">Назад</p>
          </router-link>
          <BaseSearch v-model="_search" class="!w-full mt-5 mb-[5px]" />
          <p class="text-xs text-white">
            Введите любое требование к кандидату, например, ключевой навык или
            технологию
          </p>
        </template>
    
        <template #body>
          <div class="flex flex-col mt-5 gap-y-5 w-full">
            <div>
              <p class="text-sm text-white mb-[7px]">Опыт работы</p>
              <BaseSelect label="Любой" />
            </div>
    
            <div>
              <p class="text-sm text-white mb-[7px]">Регион</p>
              <BaseSelect label="Любой" />
            </div>
    
            <div>
              <p class="text-sm text-white mb-[7px]">Доход</p>
              <div class="flex gap-x-[2px]">
                <BaseNumberInput class="input-number" label="От" />
                <BaseNumberInput class="input-number" label="До" />
              </div>
            </div>
    
            <div>
              <p class="text-sm text-white mb-[7px]">Специализация</p>
              <BaseSelect label="Любой" />
            </div>
    
            <div>
              <p class="text-sm text-white mb-[7px]">Занятость</p>
              <BaseSelect label="Любой" />
            </div>
    
            <div>
              <p class="text-sm text-white mb-[7px]">Образование</p>
              <BaseSelect label="Любой" />
            </div>
          </div>
        </template>
      </HrSidebar>
    </div>


    <div class="mx-auto min-w-[930px]">
      <BaseInterceptor @intersect="handleIntersect">
        <div class="flex flex-col gap-y-[10px]">
          <div class="flex flex-col gap-y-5">
            <CandidateMediumCard v-for="i in 100" />
          </div>
        </div>
      </BaseInterceptor>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const _search = ref()

  function handleIntersect() {
    /* if (filter.value.page + 1 <= paginator.value?.lastPage)
        filter.value = { ...filter.value, page: filter.value.page + 1 } */
  }
</script>

<style scoped lang="scss">
  .hr-candidates-page{
    max-height: 100dvh;
    @include page-hr-container;
    @apply pb-0 mx-auto;

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

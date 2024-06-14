<template>
    <div class="hr-candidate-page-list">
      <HrSidebar>
        <template #body>
          <div class="flex flex-col gap-y-[20px]">
            <router-link class="flex gap-x-[5px] items-center" :to="{ name: 'hr-candidate'}">
                <i class="w-[11px] h-[14px] text-white icon-[outlined/arrow-left]"/>
                <p class="text-white text-sm">Назад</p>
            </router-link>
          </div>
        </template>
      </HrSidebar>
  
      <div class="hr-candidate-page-list__content">
        <div class="hr-candidate-page-list__content__candidates-list">
          <div class="ml-[15px]">
            <div class="flex gap-x-[10px] p-[15px]">
              <SecondButton
                label="Выбрать"
                leftIcon="icon-[outlined/check-list]"
              />
  
              <SecondButton
                label="Выбрать все"
                leftIcon="icon-[outlined/success]"
              />
            </div>
  
            <div>
              <BaseScroll class="candidate-card__scroll mr-[-15px]">
                <BaseInterceptor @intersect="handleIntersect">
                  <div class="flex flex-col gap-y-[10px]">
                    <CandidateMiniCard v-for="i in 100" />
                  </div>
                </BaseInterceptor>
              </BaseScroll>
            </div>
          </div>
        </div>
  
        <div class="hr-candidate-page-list__content__main-window">
          <div
            class="flex gap-x-[10px] p-[15px] h-[75px] border-2 border-extra-light-gray rounded-[15px] w-full"
          >
            <SecondButton label="Отказать" leftIcon="icon-[outlined/close]" />
  
            <SecondButton label="Поделиться" leftIcon="icon-[outlined/share]" />
  
            <SecondButton label="Чат" leftIcon="icon-[outlined/chat]" />
          </div>
  
          <div
            class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]"
          >
            <CandidateCard />
          </div>
  
          <BaseSelectButton />
  
          <div
            class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]"
          >
            <BaseScroll class="candidate-card-cv__scroll mr-[-15px]">
              <CvForm hide-header/>
            </BaseScroll>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    function handleIntersect() {
      /* if (filter.value.page + 1 <= paginator.value?.lastPage)
        filter.value = { ...filter.value, page: filter.value.page + 1 } */
    }
  </script>
  
  <style scoped lang="scss">
    .hr-candidate-page-list {
      max-height: 100dvh;
      @include page-hr-container;
      @apply pb-0 mx-auto;
  
      &__content {
        @apply grid gap-x-[20px];
        grid-template-columns: 361px auto;
  
        &__candidates-list {
          @apply flex flex-col h-full border-2 border-extra-light-gray rounded-[15px] z-[1];
          margin-left: calc(-25px - 20px);
          width: calc(361px + 45px);
        }
  
        &__main-window {
          @apply w-full flex flex-col gap-y-[20px];
        }
      }
    }
  
    .candidate-card__scroll {
      @apply w-full;
      height: calc(100dvh - 190px);
    }
  
    .candidate-card-cv__scroll {
      height: calc(100dvh - 500px);
    }
  
    :deep(.hr-sidebar) {
      @apply z-[2];
    }
  </style>
  
<!-- TODO: Жду шрифты -->
<template>
  <AppMobileHeader search>
    <PageTitle title="Нетворкинг" />
  </AppMobileHeader>

  <div class="networking-page">
    <PageTitle
      class="hidden sm:block"
      title="Нетворкинг"
      description="Найдите чат с единомышленниками и заведите полезные знакомства"
    />

    <div class="networking-page__sidebar hidden sm:block">
      <div
        class="flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px]"
      >
        ФИЛЬТРЫ
      </div>
    </div>

    <div class="networking-page__container">
      <BaseInterceptor @intersect="handleIntersect">
        <div class="flex flex-col sm:gap-y-[25px]">
          <Networking
            v-for="networking in networkings"
            :key="networking.id"
            preview
            :networking="networking"
          />
        </div>
      </BaseInterceptor>
    </div>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const $route = useRoute()

  import { storeToRefs } from 'pinia'
  import { watch } from 'vue'
  import { useNetworkingStore } from '@/stores/modules/networking-store'

  const { paginator, networkings, filter } = storeToRefs(useNetworkingStore())
  const { getNetworkings } = useNetworkingStore()

  fetchData()

  function fetchData() {
    getNetworkings()
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
  .networking-page {
    @include page-container-main-right;

    &__container {
      @apply flex flex-col w-full h-full gap-y-[25px];
    }
  }
</style>

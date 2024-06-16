<template>
  <div class="candidate-item-page" v-if="application?.resume">
    <div class="flex flex-col gap-y-[28px]">
      <RouterLink
        :to="{ name: 'candidate-list' }"
        class="flex items-center gap-x-[5px]"
      >
        <i class="w-[15px] h-[16px] text-gray icon-[outlined/arrow-left]" />
        <p class="text-gray text-sm">К списку кандидатов</p>
      </RouterLink>
      <div class="p-[25px] bg-white rounded-[15px]">
        <CvForm :resume="application?.resume"/>
      </div>
    </div>

    <div class="relative mt-[49px]">
      <div
        class="flex flex-col px-[20px] py-[30px] bg-white rounded-[15px] gap-y-5 fixed w-[441px]"
      >
        <p class="text-lg">Отзыв по кандидату</p>

        <div>
          <p class="text-gray text-base font-bold mb-[7px]">Фамилия, имя</p>
          <BaseInput white label="Фамилия, имя" />
        </div>

        <div>
          <p class="text-gray text-base font-bold mb-[7px]">Оценка</p>
          <BaseSelectButton :options="selectButtonOptions" />
        </div>

        <div>
          <p class="text-gray text-base font-bold mb-[7px]">Комментарий</p>
          <BaseTextArea white label="Комментарий" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'

  // Store
  import { useApplicationStore } from '@/stores/modules/application-store'

  import useNotify from '@/utils/hooks/useNotify'

  const { notifyError } = useNotify()
  const { application } = storeToRefs(useApplicationStore())
  const { getApplication } = useApplicationStore()

  const $route = useRoute()

  fetchData()
  function fetchData() {
    getApplication(+$route.params.id).catch(notifyError)
  }

  const selectButtonOptions = [
    {
      id: 1,
      name: 'Нравится',
      icon: 'icon-[outlined/success]',
    },
    {
      id: 2,
      name: 'Не нравится',
      icon: 'icon-[outlined/close]',
    },
  ]
</script>

<style scoped lang="scss">
  .candidate-item-page {
    @include page-container-main-left;
  }
</style>

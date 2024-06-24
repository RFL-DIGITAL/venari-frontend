<template>
  <div class="candidate-item-page" v-if="application?.resume">
    <div class="flex flex-col gap-y-[28px]">
      <span
        @click="() => $router.go(-1)"
        class="flex items-center gap-x-[5px] cursor-pointer"
      >
        <i class="w-[15px] h-[16px] text-gray icon-[outlined/arrow-left]" />
        <p class="text-gray text-sm">К списку кандидатов</p>
      </span>
      <div class="p-[25px] bg-white rounded-[15px]">
        <CvForm :resume="application?.resume" />
      </div>
    </div>

    <div class="relative mt-[49px]">
      <div
        class="flex flex-col px-[20px] py-[30px] bg-white rounded-[15px] gap-y-5 fixed w-[441px]"
      >
      <template v-if="!success">
        <p class="text-lg">Отзыв по кандидату</p>
  
        <div>
          <p class="text-gray text-base font-bold mb-[7px]">Фамилия, имя</p>
          <BaseInputWithValidation white label="Фамилия, имя" name="fullName"/>
        </div>
  
        <div>
          <p class="text-gray text-base font-bold mb-[7px]">Оценка</p>
          <BaseSelectButtonWithValidation :options="selectButtonOptions" name="isApproved"/>
        </div>
  
        <div>
          <p class="text-gray text-base font-bold mb-[7px]">Комментарий</p>
          <BaseTextAreaWithValidation white label="Комментарий" name="comment"/>
        </div>
  
        <BaseButton class="w-fit" label="Отправить отзыв" @click="approve"/>
      </template>

        <p v-else class="text-lg text-red">Отзыв отправлен</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { computed, ref } from 'vue'

  // Store
  import { useApplicationStore } from '@/stores/modules/application-store'
  import { useAuthStore } from '@/stores/modules/auth-store'

  import { useForm } from 'vee-validate'
  import useNotify from '@/utils/hooks/useNotify'

  interface Form {
    fullName: string
    isApproved: boolean
    comment: string
  }

  const { notifyError } = useNotify()
  const { application } = storeToRefs(useApplicationStore())
  const { getApplication, sendApprove } = useApplicationStore()
  const { user } = storeToRefs(useAuthStore())

  const $route = useRoute()

  const success = ref(false)

  fetchData()
  function fetchData() {
    getApplication(+$route.params.id).catch(notifyError)
  }

  const initialValues = computed(() => {
    return {
      fullName: user.value?.lastName && user.value.firstName ? user.value?.lastName + ', ' + user.value?.firstName : '',
      isApproved: true,
      comment: ''
    }
  })

  const validationSchema = computed(() => {
    return {
      fullName: 'required',
      isApproved: 'required',
      comment: 'required',
    }
  })

  const { values } = useForm({
    validationSchema,
    initialValues: initialValues.value,
  })

  async function approve() {
    await sendApprove({
      applicationId: +$route.params.id,
      name: values.fullName.split(',')[1],
      surname: values.fullName.split(',')[0],
      isApproved: values.isApproved,
      comment: values.comment
    }).catch(notifyError)

    success.value = true
  }

  const selectButtonOptions = [
    {
      id: true,
      name: 'Нравится',
      icon: 'icon-[outlined/success]',
    },
    {
      id: false,
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

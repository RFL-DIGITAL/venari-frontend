<template>
  <div class="profile-resume__create-page">
    <PageTitle title="Создание резюме" />

    <div class="px-[25px] py-5 bg-white rounded-[15px]">
      <ResumeForm @submit="handleSubmit" @late="$router.push({name: 'vacancy' })"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ResumeCreateRequestBody } from '@/stores/types/schema'
  import { useResumeStore } from '@/stores/modules/resume-store'
  import { useRouter } from 'vue-router'

  import useNotify from '@/utils/hooks/useNotify'

  const { notifyError } = useNotify()

  const { postResume } = useResumeStore()

  const $router = useRouter()

  async function handleSubmit(form: ResumeCreateRequestBody) {
    await postResume(form).catch(notifyError)
    $router.push({name: 'vacancy' })
  }
</script>

<style scoped lang="scss">
  .profile-resume__create-page {
    @include page-container-main-left;
  }
</style>

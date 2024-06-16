<template>
  <div class="profile-resume__edit-page">
    <PageTitle title="Редактирование резюме" />

    <div class="px-[25px] py-5 bg-white rounded-[15px]" v-if="resume">
      <ResumeForm
        :resume="resume"
        @submit="handleSubmit"
        @late="$router.push({ name: 'profile' })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ResumeCreateRequestBody } from '@/stores/types/schema'
  import { useRouter, useRoute } from 'vue-router'

  import { useResumeStore } from '@/stores/modules/resume-store'
  import { useProfileStore } from '@/stores/modules/profile-store'

  import useNotify from '@/utils/hooks/useNotify'
  const { notifyError } = useNotify()

  const { putResume, getResume } = useResumeStore()
  const { resume } = storeToRefs(useResumeStore())
  const { user } = storeToRefs(useProfileStore())
  const { getUser } = useProfileStore()

  const $router = useRouter()
  const $route = useRoute()

  fetchData()
  async function fetchData() {
    if (!user.value) {
      await getUser(+$route.params.id).catch(notifyError)
    }

    await getResume(user.value?.resumes?.[0].id).catch(notifyError)
  }

  async function handleSubmit(form: ResumeCreateRequestBody) {
    await putResume({...form, id: resume.value!.id }).catch(notifyError)
    $router.push({ name: 'profile' })
  }
</script>

<style scoped lang="scss">
  .profile-resume__edit-page {
    @include page-container-main-left;
  }
</style>

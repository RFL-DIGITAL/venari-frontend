<template>
  <div class="mx-auto max-w-[930px] pb-10">
    <PageTitle title="Список кандидатов на оценку" />

      <div class="flex flex-col gap-y-5">
        <div class="bg-white rounded-[15px]" v-for="application in applications" :key="application.id">
          <CandidateMediumCard :candidate="application">
            <template #actions>
              <router-link v-if="application.applicationId"
                :to="{ name: 'application-item', params: { id: application.applicationId } }"
              >
                <BaseButton label="Резюме" />
              </router-link>

              <span v-else/>
            </template>
          </CandidateMediumCard>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
  // Core
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'

  // Store
  import { useApplicationStore } from '@/stores/modules/application-store'

  import useNotify from '@/utils/hooks/useNotify'

  const { notifyError } = useNotify()
  const { applications } = storeToRefs(useApplicationStore())
  const { getApplications } = useApplicationStore()

  const $route = useRoute()

  fetchData()
  function fetchData() {
    getApplications($route.params.code).catch(notifyError)
  }

</script>

<template>
  <div class="mx-auto max-w-[930px] pb-10">
    <PageTitle title="Список кандидатов на оценку" />

    <BaseInterceptor @intersect="handleIntersect">
      <div class="flex flex-col gap-y-5">
        <div class="bg-white rounded-[15px]" v-for="candidate in candidates" :key="candidate.id">
          <CandidateMediumCard :candidate="candidate">
            <template #actions>
              <router-link v-if="candidate && candidate.resumes.length"
                :to="{ name: 'candidate-item', params: { id: candidate.id, resumeId: candidate.resumes[0].id } }"
              >
                <BaseButton label="Резюме" />
              </router-link>

              <span v-else/>
            </template>
          </CandidateMediumCard>
        </div>
      </div>
    </BaseInterceptor>
  </div>
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

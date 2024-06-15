<template>
  <div class="hr-candidate-page-list">
    <HrSidebar>
      <template #body>
        <div class="flex flex-col gap-y-[20px]">
          <router-link
            class="flex gap-x-[5px] items-center"
            :to="{ name: 'hr-candidate' }"
          >
            <i
              class="w-[11px] h-[14px] text-white icon-[outlined/arrow-left]"
            />
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
                <div class="flex flex-col">
                  <CandidateMiniCard
                    v-for="candidate in candidates"
                    :key="candidate.id"
                    :candidate="candidate"
                    :selected="selected"
                    @update:selected="handleSelectCandidate"
                  />
                </div>
              </BaseInterceptor>
            </BaseScroll>
          </div>
        </div>
      </div>

      <div
        class="hr-candidate-page-list__content__main-window"
        v-if="selected.length"
      >
        <div
          class="flex gap-x-[10px] p-[15px] h-[75px] border-2 border-extra-light-gray rounded-[15px] w-full"
        >
          <SecondButton label="Отказать" leftIcon="icon-[outlined/close]" />

          <SecondButton label="Поделиться" leftIcon="icon-[outlined/share]" />

          <router-link v-if="selected.length === 1" :to="{ name: 'chats-active', params: { id: selected[0],  }, query: { chatType: 'message' }}">
            <SecondButton label="Чат" leftIcon="icon-[outlined/chat]" />
          </router-link>
        </div>

        <template v-if="selected.length === 1">
          <div
            class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]"
          >
            <CandidateCard />
          </div>

          <BaseSelectButton :options="tabOptions" v-model="tab" />

          <div class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]" v-if="tab === 1">
            <BaseScroll class="candidate-card-cv__scroll mr-[-15px]">
              <CvForm hide-header />
            </BaseScroll>
          </div>

          <div class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]" v-if="tab === 2">
            <BaseScroll class="candidate-card-cv__scroll mr-[-15px]">
              
            </BaseScroll>
          </div>

          <div class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]" v-if="tab === 3">
            <BaseScroll class="candidate-card-cv__scroll mr-[-15px]">
              
            </BaseScroll>
          </div>
        </template>
      </div>

      <p
        v-else
        class="text-title-small text-gray w-[300px] mt-[15px] ml-[15px]"
      >
        Выберите кандидата для просмотра его карточки или нескольких кандидатов
        для того, чтобы поделиться списком резюме
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Core
  import { storeToRefs } from 'pinia'
  import { watchDebounced } from '@vueuse/core'
  import { useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'

  // Store
  import { useHrCandidateStore } from '@/stores/modules/hr/hr-candidate-store'
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  import useNotify from '@/utils/hooks/useNotify'

  const $route = useRoute()

  const selected = ref<number[]>([])
  const tab = ref<1 | 2 | 3>(1)
  const tabOptions = [
    {
      name: 'Резюме',
      id: 1,
    },
    {
      name: 'Комментарии',
      id: 2,
    },
    {
      name: 'В вакансиях',
      id: 3,
    },
  ]

  const { notifyError } = useNotify()
  const { filters } = storeToRefs(useHrStore())
  const { paginator, candidates, filter } = storeToRefs(useHrCandidateStore())
  const { getCandidates } = useHrCandidateStore()

  filter.value.stageId = $route.query.stage
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

  function handleSelectCandidate(_selected: number) {
    if (selected.value.includes(_selected))
      selected.value = selected.value.filter((s) => s !== _selected)
    else selected.value.push(_selected)
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

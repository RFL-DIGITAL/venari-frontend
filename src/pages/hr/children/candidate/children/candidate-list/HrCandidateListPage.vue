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
              <BaseInterceptor @intersect="handleIntersect" :height="100">
                <div class="flex flex-col">
                  <CandidateMiniCard
                    v-for="application in applications"
                    :key="application.id"
                    :application="application"
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
          <BaseSplitButton label="Переместить" :options="stageOptions" />

          <SecondButton
            label="Отказать"
            leftIcon="icon-[outlined/close]"
            @click="
              handleChangeCandidatesStage(
                filters?.stages.find((s) => s.stageType.name === 'reject')?.id,
                'reject',
              )
            "
          />

          <SecondButton
            label="Поделиться"
            leftIcon="icon-[outlined/share]"
            @click="handleShare"
          />

          <router-link
            v-if="application"
            :to="{
              name: 'chats-active',
              params: { id: application.resume.userId },
              query: { chatType: 'message' },
            }"
          >
            <SecondButton label="Чат" leftIcon="icon-[outlined/chat]" />
          </router-link>
        </div>

        <template v-if="!!application">
          <div
            class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]"
          >
            <CandidateCard :candidate="application.resume.user" />
          </div>

          <BaseSelectButton :options="tabOptions" v-model="tab" />

          <div
            class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]"
            v-if="tab === 1"
          >
            <BaseScroll class="candidate-card-cv__scroll mr-[-15px]">
              <CvForm hide-header :resume="application.resume" />
            </BaseScroll>
          </div>

          <div
            class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]"
            v-if="tab === 2"
          >
            <BaseScroll
              class="candidate-card-cv__scroll mr-[-15px]"
              v-if="application.approves"
            >
              <div
                v-for="approve in application.approves"
                :key="approve.id"
                class="w-full flex flex-col px-5 py-[25px] gap-5 border-b border-extra-light-gray"
              >
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-x-[10px]">
                    <i
                      v-if="approve.status === 1"
                      class="w-[36px] h-[36px] icon-[success-red]"
                    />
                    <i v-else class="w-[36px] h-[36px] icon-[comment-reject]" />
                    <p class="text-base font-bold">
                      {{ approve.surname }} {{ approve.name }}
                    </p>
                  </div>

                  <p>{{ getFormattedTime(approve.createdAt) }}</p>
                </div>

                <p class="text-sm text-gray text-break">{{ approve.text }}</p>
              </div>
            </BaseScroll>
          </div>

          <div
            class="border-2 border-extra-light-gray rounded-[15px] w-full p-[15px]"
            v-if="tab === 3"
          >
            <BaseScroll
              class="candidate-card-cv__scroll mr-[-15px]"
              v-if="application.histories.length"
            >
              <div class="grid grid-cols-4 px-5 gap-x-[30px]" style="grid-template-rows: auto(1fr, auto)">
                <p class="h-[20px] font-bold text-sm">Вакансия</p>
                <p class="h-[20px] font-bold text-sm">Регион</p>
                <p class="h-[20px] font-bold text-sm">Статус</p>
                <p class="h-[20px] font-bold text-sm">Дата</p>

                <div 
                  v-for="history in application.histories"
                  :key="history.id"
                  class="col-span-4 grid grid-cols-4 gap-x-[30px] py-3 border-b border-extra-light-gray"
                >
                  <div class="grid gap-y-5">
                    <p class="text-sm">
                      {{ application.vacancy?.position?.name }}
                    </p>
                  </div>

                  <div class="grid gap-y-5">
                    <p class="text-sm">{{ application.vacancy?.city?.name}}</p>
                  </div>

                  <div class="grid gap-y-5">
                    <p class="text-sm">{{ history?.text }}</p>
                  </div>

                  <div class="grid gap-y-5">
                    <p class="text-sm">{{ formatDate(history?.createdAt) }}</p>
                  </div>
                </div>
              </div>
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

  <HrCandidateRejectDialog ref="hrCandidateRejectDialog" />
  <HrCandidateInterviewDialog ref="hrCandidateInterviewDialog" />
  <HrCandidateOfferDialog ref="hrCandidateOfferDialog" />
  <ShareDialog ref="shareDialog" />
</template>

<script setup lang="ts">
  // Core
  import { storeToRefs } from 'pinia'
  import { useDebounceFn, watchDebounced } from '@vueuse/core'
  import { useRoute, useRouter } from 'vue-router'
  import { computed, onMounted, ref, watch } from 'vue'

  // Types
  import { ApplicationShort } from '@/stores/types/schema'

  // Store
  import { useHrApplicationStore } from '@/stores/modules/hr/hr-application-store'
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  import useNotify from '@/utils/hooks/useNotify'

  import {
    getFormattedTime,
    formatDate,
  } from '@/utils/functions/get-formatted-time'

  // Dialogs
  import HrCandidateRejectDialog from './HrCandidateRejectDialog.vue'
  import HrCandidateInterviewDialog from './HrCandidateInterviewDialog.vue'
  import HrCandidateOfferDialog from './HrCandidateOfferDialog.vue'
  import ShareDialog from '@/components/_ui_kit/ShareDialog.vue'

  const $router = useRouter()
  const $route = useRoute()

  const selected = ref<ApplicationShort[]>([])
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
  const { paginator, applications, filter, application } = storeToRefs(
    useHrApplicationStore(),
  )
  const {
    getApplications,
    changeApplicationsStage,
    shareApplications,
    getApplication,
  } = useHrApplicationStore()

  const fetchData = useDebounceFn((edded = true) => {
    getApplications(edded).catch(notifyError)
  }, 250)

  filter.value.stageId = $route.query.stage
  fetchData(false)

  watch(
    filter.value,
    () => {
      fetchData()
    },
    { deep: true, immediate: true },
  )

  function handleIntersect() {
    if (filter.value.page + 1 <= paginator.value?.lastPage) {
      filter.value = { ...filter.value, page: filter.value.page + 1 }
      fetchData()
    }
  }

  function handleSelectCandidate(_selected: number) {
    if (selected.value.includes(_selected))
      selected.value = selected.value.filter((s) => s !== _selected)
    else selected.value.push(_selected)
  }

  async function handleChangeCandidatesStage(
    stageId: number,
    stageType: 'base' | 'interview' | 'offer' | 'reject',
  ) {
    let _body = {
      stageId: stageId,
      applicationIds: selected.value.map((s) => s.id),
    }

    if (stageType === 'reject') {
      const obj: any = await showRejectDialog()

      if (obj === null) return

      _body = {
        ..._body,
        ...obj,
      }
    }

    if (stageType === 'interview') {
      const obj: any = await showInterviewDialog()

      if (obj === null) return

      _body = {
        ..._body,
        ...obj,
      }
    }

    if (stageType === 'offer') {
      const obj: any = await showOfferwDialog()

      if (obj === null) return

      _body = {
        ..._body,
        ...obj,
      }
    }

    await changeApplicationsStage(_body).catch(notifyError)
    fetchData(false)
  }

  const stageOptions = computed(() => {
    return filters.value?.stages.map((stage) => {
      return {
        label: stage.name,
        command: () =>
          handleChangeCandidatesStage(stage.id, stage.stageType.name),
      }
    })
  })

  const hrCandidateRejectDialog = ref<InstanceType<
    typeof HrCandidateRejectDialog
  > | null>(null)

  const showRejectDialog = async () => {
    const rejectForm = await hrCandidateRejectDialog.value
      ?.open('Отказ кандидату', 'Отказать')
      .catch(() => null)

    return rejectForm
  }

  const hrCandidateInterviewDialog = ref<InstanceType<
    typeof HrCandidateInterviewDialog
  > | null>(null)

  const showInterviewDialog = async () => {
    const rejectForm = await hrCandidateInterviewDialog.value
      ?.open('Приглашение на интервью', 'Пригласить')
      .catch(() => null)

    return rejectForm
  }

  const hrCandidateOfferDialog = ref<InstanceType<
    typeof HrCandidateOfferDialog
  > | null>(null)

  const showOfferwDialog = async () => {
    const rejectForm = await hrCandidateOfferDialog.value
      ?.open('Отправка оффера', 'Отправить')
      .catch(() => null)

    return rejectForm
  }

  const shareDialog = ref<InstanceType<typeof ShareDialog> | null>(null)

  async function handleShare() {
    const code = await shareApplications({
      applicationIds: selected.value.map((s) => s.id),
    })

    const href = `${window.location.origin}${$router.resolve({ name: 'application-list', params: { code } }).fullPath}`
    await shareDialog.value?.open(
      'Поделиться материалом',
      'Ссылка на материал',
      href,
    )
  }

  watch(
    () => selected.value,
    () => {
      if (selected.value.length === 1)
        getApplication(selected.value[0].id).catch(notifyError)
    },
    { deep: true },
  )
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
    height: calc(100dvh - 535px);
  }

  :deep(.hr-sidebar) {
    @apply z-[2];
  }
</style>

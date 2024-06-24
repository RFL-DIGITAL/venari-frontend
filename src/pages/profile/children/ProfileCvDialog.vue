<template>
  <Dialog
    :draggable="false"
    class="cv-dialog"
    :visible="_visible"
    modal
    header="Уведомления"
    @update:visible="close"
  >
    <template #header>
      <div class="flex gap-x-[25px]">
        <Button text plain aria-label="Share" @click="handleShare">
          <div class="text-red flex items-center gap-x-[10px]">
            <i
              class="sm:w-[24px] sm:h-[24px] w-[19px] h-[19px] icon-[outlined/share]"
            />
            <p class="text-sm font-medium">Поделиться</p>
          </div>
        </Button>

        <Button text plain aria-label="Share">
          <p class="text-sm font-medium">Скачать резюме</p>
        </Button>
      </div>
    </template>

    <template #default>
      <BaseScroll class="cv-dialog__scroll">
        <CvForm v-if="resume || _resume" :resume="resume || _resume"/>
      </BaseScroll>
    </template>
  </Dialog>

  <ShareDialog ref="shareDialog"/>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { Resume } from '@/stores/types/schema'

  // Store
  import { useProfileStore } from '@/stores/modules/profile-store'
  import { useResumeStore } from '@/stores/modules/resume-store'

  import useNotify from '@/utils/hooks/useNotify'
  import ShareDialog from '@/components/_ui_kit/ShareDialog.vue'

  interface NotificationDialog {
    visible: boolean
    resume?: Resume
  }

  const props = defineProps<NotificationDialog>()

  const $emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
  }>()

  const { notifyError } = useNotify()

  const { user } = storeToRefs(useProfileStore())
  const { resume: _resume } = storeToRefs(useResumeStore())
  const { getResume } = useResumeStore()

  fetchData()

  async function fetchData() {
    if(!props.resume)
      getResume(user.value?.resumes?.[0].id).catch(notifyError)
  }

  const _visible = computed({
    get() {
      return props.visible
    },
    set(value: boolean) {
      $emit('update:visible', value)
    },
  })

  const shareDialog = ref<InstanceType<typeof ShareDialog> | null>(null)

  async function handleShare() {
    await shareDialog.value?.open('Поделиться резюме', 'Ссылка на резюме')
  }

  function close() {
    _visible.value = false
  }

  function handleOutsideClick(event: any) {
    const element = document.querySelector('.p-dialog')

    const exceptions = ['.p-dropdown-items-wrapper']; // Классы исключений

    // Проверяем, является ли цель клика исключением
    if (exceptions.some(selector => document.querySelector(selector)?.contains(event.target))) {
      return;
    }

    if (!element?.contains(event.target)) {
      close()
    }
  }

  onMounted(() => {
    hideScroll()
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick)
    }, 1)
  })

  onUnmounted(() => {
    showScroll()
    document.removeEventListener('click', handleOutsideClick)
  })

  function hideScroll() {
    document.documentElement.style.overflow = 'hidden'
  }

  function showScroll() {
    document.documentElement.style.overflow = 'auto'
  }
</script>

<style lang="scss">
  .p-dialog.cv-dialog {
    color: var(--black) !important;
    width: 871px;
    top: calc(40px);
    position: absolute;
    bottom: 40px;
    z-index: 12001;

    & > * {
      color: var(--black);
    }

    .p-dialog-header-close {
      @apply icon-[outlined/close] w-[30px] h-[30px] text-black;

      .p-dialog-header-close-icon {
        display: none;
      }
    }
  }

  .p-component-overlay {
    @apply cursor-pointer relative;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.15) !important;
    z-index: 12000 !important;
  }

  .cv-dialog__scroll {
    height: 100%;
  }
</style>

<template>
  <Dialog
    :draggable="false"
    class="hr-publication-dialog"
    :visible="_visible"
    modal
    :header="publication ? 'Редактирование публикации' : 'Новая публикация'"
    @update:visible="close"
  >
    <template #default>
      <BaseScroll class="hr-publication-dialog__scroll">
        <HrPublicationForm :publication="post" @submit="handleSubmit" v-if="publication && post || !publication"/>
      </BaseScroll>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue'
  import {
    HrPublicationBodyRequest,
    Post,
    postCreatePublicationRequest,
  } from '@/stores/types/schema'
  import { storeToRefs } from 'pinia'

  // Store
  import useNotify from '@/utils/hooks/useNotify'

  // Store
  import { usePostStore } from '@/stores/modules/post-store'

  const { getPost } = usePostStore()
  const { post } = storeToRefs(usePostStore())

  interface NotificationDialog {
    visible: boolean
    publication: Post
    edit: boolean
  }

  const props = defineProps<NotificationDialog>()

  const $emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
  }>()

  const { notifyError } = useNotify()

  const _visible = computed({
    get() {
      return props.visible
    },
    set(value: boolean) {
      $emit('update:visible', value)
    },
  })

  function close() {
    _visible.value = false
  }

  function handleOutsideClick(event: any) {
    const element = document.querySelector('.p-dialog')

    const exceptions = ['.p-dropdown-items-wrapper', '.p-tieredmenu'] // Классы исключений

    // Проверяем, является ли цель клика исключением
    if (
      exceptions.some((selector) =>
        document.querySelector(selector)?.contains(event.target),
      )
    ) {
      return
    }

    if (!element?.contains(event.target)) {
      close()
    }
  }

  if(props.publication?.id)
    fetchData()

  async function fetchData() {
    await getPost(props.publication?.id)
  }

  async function handleSubmit(form: HrPublicationBodyRequest) {
    try {
      if (!props.publication)
        await postCreatePublicationRequest(form).catch(notifyError)
      close()   
    }
      catch(error) {
        notifyError(error)
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
  .p-dialog.hr-publication-dialog {
    @apply absolute;
    color: var(--black) !important;
    width: 871px;
    max-height: calc(100%);
    top: calc(80px + 25px);
    bottom: 25px;
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

    .p-dialog-header span {
      @apply text-2xl font-bold;
    }
  }

  .p-component-overlay {
    @apply cursor-pointer relative;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.15) !important;
    z-index: 12000 !important;
  }

  .hr-publication-dialog__scroll {
    height: 100%;
    max-height: calc(100vh - 200px);
  }
</style>

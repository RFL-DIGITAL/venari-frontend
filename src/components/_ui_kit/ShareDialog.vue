<template>
  <Dialog
    class="confirmed-dialog"
    :visible="visible"
    :header="_title"
    @update:visible="closeDialog"
  >
    <template #default>
      <div class="flex flex-col gap-y-5">
        <div class="flex flex-col">
          <p class="text-sm text-gray mb-[7px]">{{ _message }}</p>
          <BaseInput white class="mb-[7px]" :model-value="location" />
          <p class="text-xs text-gray">
            Скопируйте и поделитесь этой ссылкой в мессенджерах и соцсетях
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <BaseButton class="mx-auto" label="Скопировать" @click="handleConfirm" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
  // Core
  import { ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'

  // Hooks
  import { useHrStore } from '@/stores/modules/hr/hr-store'

  const { filters } = storeToRefs(useHrStore())

  type PromiseResolve = (value: any | null | PromiseLike<any | null>) => void
  type PromiseReject = (reason?: any) => void

  interface Props {
    checkBeforeSubmit?: () => Promise<boolean> | boolean
  }

  defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'submit', value: any | null): void
    (e: 'close'): void
    (e: 'cancel'): void
  }>()

  defineExpose({
    open,
    closeDialog,
  })

  const visible = ref(false)
  const _title = ref('')
  const _message = ref('')
  const location = ref(window.location.href)
  let _resolve: PromiseResolve | null = null
  let _reject: PromiseReject | null = null

  // Если передан слот, message не передаём
  function open(
    title: string,
    message?: string,
    href?: string,
  ): Promise<boolean> {
    visible.value = true
    _title.value = title

    if (message) _message.value = message
    if (href) location.value = href

    return new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
  }

  async function handleConfirm() {
    const url = location.value || window.location.href
    if (navigator.clipboard) {
      // Поддержка Clipboard API имеется
      await navigator.clipboard.writeText(url)
    } else {
      // Поддержки Clipboard API нет, используем execCommand
      const textarea = document.createElement('textarea')
      textarea.value = url
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
      } catch (err) {
        console.error('Ошибка при копировании текста: ', err)
      }
      document.body.removeChild(textarea)
    }

    ;(_resolve as PromiseResolve)(true ?? null)
    closeDialog()
  }

  function handleCancel() {
    ;(_reject as PromiseReject)(true)
    $emit('cancel')
    closeDialog()
  }

  function closeDialog() {
    ;(_reject as PromiseReject)(true)
    visible.value = false
    $emit('close')
  }

  function handleOutsideClick(event: any) {
    const element = document.querySelector('.p-dialog')

    const exceptions = ['.p-dropdown-items-wrapper'] // Классы исключений

    // Проверяем, является ли цель клика исключением
    if (
      exceptions.some((selector) =>
        document.querySelector(selector)?.contains(event.target),
      )
    ) {
      return
    }

    if (!element?.contains(event.target)) {
      closeDialog()
    }
  }

  watch(
    () => visible.value,
    () => {
      if (visible.value)
        setTimeout(() => {
          document.addEventListener('click', handleOutsideClick)
        }, 1)
      else document.removeEventListener('click', handleOutsideClick)
    },
  )
</script>

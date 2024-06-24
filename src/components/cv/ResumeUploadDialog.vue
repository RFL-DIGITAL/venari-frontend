<template>
  <Dialog
    class="confirmed-dialog"
    :visible="visible"
    :header="_title"
    @update:visible="closeDialog"
  >
    <template #default>
      <div class="flex flex-col gap-y-5">
        <p class="text-sm">Загрузите резюме с hh в формате .doc</p>

        <input
          @change="handleFileChange"
          accept=".doc,.rtf"
          type="file"
          ref="fileInput"
          style="display: none"
        />
        <button
          class="text-sm text-red underline text-left"
          @click="triggerFileInput"
        >
          {{ fileName || 'Выбрать файл' }}
        </button>
      </div>
    </template>
    <template #footer>
      <BaseButton class="mx-auto" label="Продолжить" @click="handleConfirm" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
  const file = ref(null)
  const fileName = ref('')
  const fileInput = ref(null)

  const triggerFileInput = () => {
    fileInput.value.click()
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (
      selectedFile &&
      (selectedFile.type === 'application/msword' ||
        selectedFile.type === 'application/rtf')
    ) {
      file.value = selectedFile
      fileName.value = selectedFile.name
    }
  }

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
    const formData = new FormData()
    formData.append(file.value.type, file.value)

    ;(_resolve as PromiseResolve)(formData ?? null)
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

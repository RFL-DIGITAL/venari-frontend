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
          <p class="text-sm text-gray mb-[7px]">Сообщение кандидату</p>
          <BaseTextAreaWithValidation name="interviewMessage" class="mb-[7px]" />
          <p class="text-xs text-gray">Кандидату будет направлено приглашение записаться на интервью в один из доступных слотов</p>
        </div>
      </div>
    </template>
    <template #footer>
      <BaseButton class="mx-auto" :label="_message" @click="handleConfirm" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
  // Core
  import { onMounted, onUnmounted, ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'

  // Store
  import { useForm } from 'vee-validate'

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

  interface Form {
    interviewMessage: string
  }

  const { values, validate } = useForm<Form>({
    validationSchema: {
      interviewMessage: 'required',
    },
  })

  const visible = ref(false)
  const _title = ref('')
  const _message = ref('')
  let _resolve: PromiseResolve | null = null
  let _reject: PromiseReject | null = null

  // Если передан слот, message не передаём
  function open(title: string, message?: string): Promise<boolean> {
    visible.value = true
    _title.value = title

    if (message) _message.value = message

    return new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })
  }

  async function handleConfirm() {
    const { valid } = await validate()
    if (valid) {
      ;(_resolve as PromiseResolve)(values ?? null)
      closeDialog()
    }
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

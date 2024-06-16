<template>
  <Dialog
    class="reject-dialog"
    :visible="visible"
    :header="_title"
    @update:visible="closeDialog"
  >
    <template #default>
      <div class="flex flex-col gap-y-5">
        <div class="flex flex-col">
          <p class="text-sm text-gray mb-[7px]">Причина отказа</p>
          <BaseSelectWithValidation
            name="rejectReasonId"
            :options="filters?.rejectReasons"
          />
        </div>
        <BaseCheckbox
          label="Отправить сообщение"
          v-model="isSendRejectMessage"
        />

        <div class="flex flex-col" v-if="isSendRejectMessage">
          <p class="text-sm text-gray mb-[7px]">Сообщение кандидату</p>
          <BaseTextAreaWithValidation name="rejectMessage" />
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

  type PromiseResolve = (
    value: any | null | PromiseLike<any | null>,
  ) => void
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
    rejectReasonId?: number
    rejectMessage?: string
  }

  const isSendRejectMessage = ref(false)

  const { values, validate } = useForm<Form>({
    validationSchema: {
      rejectReasonId: 'required|email',
      rejectMessage: isSendRejectMessage.value ? 'required' : '',
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
    if(valid) {

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
    console.log(event)

    const exceptions = ['.p-dropdown-items-wrapper']; // Классы исключений

    // Проверяем, является ли цель клика исключением
    if (exceptions.some(selector => document.querySelector(selector)?.contains(event.target))) {
      return;
    }

    if (!element?.contains(event.target)) {
      closeDialog()
    }
  }

  watch(() => visible.value, () => {
    if(visible.value)
      setTimeout(() => {
        document.addEventListener('click', handleOutsideClick)
      }, 1)
    else
      document.removeEventListener('click', handleOutsideClick)
  })
</script>

<style lang="scss">
  .p-dialog.reject-dialog {
    @apply w-[520px] bg-white/70;
    box-shadow: 4px 4px 44px 0px rgba(90, 90, 90, 0.25);

    .p-dialog-content {
      @apply flex flex-col grow h-full bg-white/70;
    }

    .p-dialog-footer {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      @apply mt-auto bg-white/70;
    }

    .p-dialog-header {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      @apply bg-white/70;
    }

    .p-dialog-header-close {
      @apply icon-[outlined/close] text-black;
      width: 24px !important;
      height: 24px !important;

      .p-dialog-header-close-icon {
        display: none;
      }
    }
  }

  .p-dialog-mask {
    @apply cursor-pointer relative pointer-events-auto;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.15) !important;
    z-index: 12000 !important;
  }
</style>

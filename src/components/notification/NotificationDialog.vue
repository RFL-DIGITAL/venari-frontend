<template>
  <Dialog :draggable="false"
    class="notification-dialog"
    :visible="_visible"
    modal
    header="Уведомления"
    @update:visible="close"
  >
    <template #default>
        ЗАМЕНИТЬ ПОТОМ
      <ChatWindow />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue'

  interface NotificationDialog {
    visible: boolean
  }

  const props = defineProps<NotificationDialog>()

  const $emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
  }>()

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
    if (!element?.contains(event.target)) {
      close()
    }
  }

  onMounted(() => {
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick)
    }, 1)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick)
  })
</script>

<style lang="scss">
  .p-dialog.notification-dialog {
    @apply absolute;
    max-width: 30vw;
    max-height: calc(100% - 25px);
    top: calc(80px + 25px);
    right: 50px;
    z-index: 12001;

    .p-dialog-header-close {
      @apply icon-[outlined/close] w-[30px] h-[30px] text-black;

      .p-dialog-header-close-icon {
        display: none;
      }
    }
  }

  .p-component-overlay {
    @apply cursor-pointer z-[1000] relative;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.15) !important;
  }
</style>

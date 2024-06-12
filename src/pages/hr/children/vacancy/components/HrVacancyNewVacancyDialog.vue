<template>
    <Dialog
      class="hr-vacancy-dialog"
      :visible="_visible"
      modal
      header="Новая вакансия"
      @update:visible="close"
    >
  
      <template #default>
        <BaseScroll class="hr-vacancy-dialog__scroll">
          <HrVacancyForm />
        </BaseScroll>
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
    .p-dialog.hr-vacancy-dialog {
      @apply absolute;
      color: var(--black) !important;
      width: 871px;
      max-height: calc(100%);
      top: calc(80px + 25px);
      bottom: 25px;
      z-index: 2001;
  
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
      @apply cursor-pointer z-[1000] relative;
      backdrop-filter: blur(8px);
      background-color: rgba(0, 0, 0, 0.15) !important;
    }
  
    .hr-vacancy-dialog__scroll {
      height: 100%;
      max-height: calc(100vh - 200px);
    }
  </style>
  
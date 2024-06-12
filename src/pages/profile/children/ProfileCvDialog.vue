<template>
  <Dialog
    class="cv-dialog"
    :visible="_visible"
    modal
    header="Уведомления"
    @update:visible="close"
  >
    <template #header>
      <div class="flex gap-x-[25px]">
        <Button text plain aria-label="Share">
          <div class="text-blue flex items-center gap-x-[10px]">
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
        <CvForm />
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
  .p-dialog.cv-dialog {
    color: var(--black) !important;
    width: 871px;
    max-height: calc(100% - 25px);
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
  }

  .p-component-overlay {
    @apply cursor-pointer z-[1000] relative;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.15) !important;
  }

  .cv-dialog__scroll {
    height: 100%;
    max-height: calc(100vh - 268px);
  }
</style>

<!-- TODO: Нужно сдлеать в chatWindow Preview режим -->
<template>
  <Dialog :draggable="false" v-if="networking"
    class="networking-dialog"
    :visible="true"
    modal
    @update:visible="close"
  >
    <template #header>
      <div class="networking-dialog__header">
        <i
          class="w-[22px] h-[36px] text-gray icon-[outlined/arrow-left]"
          @click="close"
        />
        <div class="flex sm:gap-x-2 space-x-2">
          <EntityAvatar :image="networking.image?.image"/>

          <div class="flex flex-col space">
            <p class="text-base font-bold">{{networking?.name}}</p>

            <div class="flex space-x-2 justify-center items-center">
              <Chip class="tiny yellow" label="Групповой чат" />
              <p class="text-xs text-gray">{{networking?.memberCount}} {{getDeclensionText(networking?.memberCount ?? 0, ['участник', 'участника', 'участников'])}}</p>
            </div>
          </div>
        </div>

        <BaseButton
          :disabled="networking.isJoined"
          class="h-[38px] sm:block hidden"
          label="Присоединиться к чату"
          @click="handleButtonClick"
        />
      </div>
    </template>

    <template #default>
      <ChatWindow chatType="chatMessage" :chatInputVisible="false" className="!h-[50vh]" />

      <div class="flex items-center justify-center">
        <BaseButton
          :disabled="networking.isJoined"
          class="h-[38px] sm:hidden block  justify-center"
          label="Присоединиться к чату"
          @click="handleButtonClick"
        />
      </div>

    </template>

  </Dialog>
</template>

<script setup lang="ts">
  // Core
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useRoute } from 'vue-router'
  import { watch } from 'vue'
  import { storeToRefs } from 'pinia'

  // Hooks
  import useNotify from '@/utils/hooks/useNotify'
  import { getFormattedTime } from '@/utils/functions/get-formatted-time'
  import { isEqual } from 'lodash'
  import { getDeclensionText } from '@/utils/functions/get-declension-text';

  // Store
  import { useNetworkingStore } from '@/stores/modules/networking-store'
import { joinChatRequest } from '@/stores/types/schema'

  const $router = useRouter()

  const { networking } = storeToRefs(useNetworkingStore())
  const { getNetworking } = useNetworkingStore()
  const { notifyError } = useNotify()

  const $route = useRoute()

  fetchData()
  async function fetchData() {
    getNetworking(+$route.params.id).catch(notifyError)
  }

  function close() {
    $router.push({ name: 'networking-list' })
  }

  async function handleButtonClick() {
     await joinChatRequest(Number(networking.value?.id))
     $router.push({ name: 'chats-active', params: { id: networking.value?.id,  }, query: { chatType: 'chatMessage' } })
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

  watch(
    () => $route.params,
    (oldId, newId) => {
      if (!isEqual(oldId, newId)) fetchData()
    },
  )

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
  .p-dialog.networking-dialog {
    @apply absolute;
    max-width: 60vw;
    max-height: calc(100% - 25px);
    top: calc(80px + 25px);
    right: 50px;
    z-index: 12001;

    @media  screen and (max-width: 1024px) {
      top: unset;
      right: unset;
      width: 90vw;
      height: 58vh;     
      max-width: unset; 
      max-height: unset;
    }

    .networking-dialog__header {
      // @apply w-full grid gap-x-[20px] h-[50px] items-center;
      // grid-template-columns: 22px auto 210px;
      display: flex;
      @apply space-x-2;
      @apply space-y-2 items-center justify-center;
    }


    .p-dialog-header-icons {
      display: none;
    }
    .p-dialog-header {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        width: calc(100% - 48px);
        left: 24px;
        bottom: 0;
        border-bottom: 2px solid var(--light-gray);
      }
    }
  }

  .p-component-overlay {
    @apply cursor-pointer relative;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.15) !important;
    z-index: 12000 !important;
  }

  .p-dialog-content { 
    @apply flex flex-col ;
  }
  
</style>

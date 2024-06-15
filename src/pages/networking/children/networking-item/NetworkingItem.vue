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
        <div class="flex gap-x-[18px]">
          <EntityAvatar :image="networking.image?.image"/>

          <div class="flex flex-col gap-y-[5px]">
            <p class="text-base font-bold">{{networking?.name}}</p>

            <div class="flex items-center gap-x-[10px]">
              <Chip class="tiny yellow" label="Групповой чат" />
              <p class="text-xs text-gray">{{networking?.memberCount}} {{getDeclensionText(networking?.memberCount ?? 0, ['участник', 'участника', 'участников'])}}</p>
            </div>
          </div>
        </div>

        <BaseButton
          :disabled="networking.isJoined"
          class="h-[38px]"
          label="Присоединиться к чату"
          @click="handleButtonClick"
        />
      </div>
    </template>

    <template #default>
      <ChatWindow chatType="chatMessage" :chatInputVisible="false" className="!h-[50vh]" />
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

    .networking-dialog__header {
      @apply w-full grid gap-x-[20px] h-[50px] items-center;
      grid-template-columns: 22px auto 210px;
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
    @apply cursor-pointer z-[1000] relative;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.15) !important;
  }
</style>

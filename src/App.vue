<template>
  <!-- Клиентская часть -->
  <div class="client-view" v-if="user && !isHr">
    <AppHeader />

    <main class="client-view__content">
      <RouterView class="content" />
    </main>

    <AppFooter class="block sm:hidden" />
  </div>

  <!-- Возможно hr панель -->
  <div class="hr-view" v-else-if="user && isHr">
    <AppHeader />
    <RouterView />
  </div>

  <!-- Аутентификация -->
  <div class="flex flex-col h-full w-full min-h-[100vh]" v-else>
    <router-view />
  </div>
</template>

<script setup lang="ts">
  // Core
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  // Store
  import { useAuthStore } from '@/stores/modules/auth-store'

  // Hooks
  import { useIsActiveRoutePath } from './utils/hooks/use-is-active-route-path'

  const { user } = storeToRefs(useAuthStore())

  const { isRouteIncludeChildsActive } = useIsActiveRoutePath()

  const isHr = computed(() => isRouteIncludeChildsActive('/hr'))
</script>

<style lang="scss">
  #app {
    min-height: 100dvh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
  }

  .client-view {
    @apply h-full w-full flex flex-col sm:bg-extra-light-gray bg-white mt-20;
    min-height: calc(100dvh - 80px);

    &__content {
      @apply w-full h-full max-w-[1440px] mx-auto sm:mt-[30px];
    }
  }

  .hr-view {
    @apply h-full w-full flex flex-col bg-white mt-20;
    min-height: calc(100dvh - 80px);

    & > div {
      @apply w-full h-full max-w-[1440px] p-[15px] grow;
    }
  }
  
</style>

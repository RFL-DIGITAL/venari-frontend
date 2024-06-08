<template>
  <!-- Клиентская часть -->
  <div class="client-view" v-if="user">
    <AppHeader />

    <main class="client-view__content">
      <RouterView class="content"/>
    </main>
  </div>

  <!-- Возможно hr панель -->
  <div v-else-if="false"></div>

  <!-- Аутентификация -->
  <div class="flex flex-col h-full w-full min-h-[100vh]" v-else>
    <router-view/>
  </div>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/modules/auth-store'

const { user } = storeToRefs(useAuthStore())
</script>

<style lang="scss">
  #app {
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
  }

  .client-view {
    @apply h-full w-full flex flex-col bg-extra-light-gray mt-20;
    height: 100%;
    min-height: 100vh;

    &__content {
      @apply w-full h-full max-w-[1440px] mx-auto mt-[30px];

    }
  }
</style>

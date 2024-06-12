<template>
  <!-- Клиентская часть -->
  <div class="client-view" v-if="user && !false"> 
    <AppHeader />

    <main class="client-view__content">
      <RouterView class="content"/>
    </main>

    <AppFooter class="block sm:hidden"/>
  </div>

  <!-- Возможно hr панель -->
  <div class="hr-view" v-else-if="user && true">
    <router-view/>
  </div>

  <!-- Аутентификация -->
  <div class="flex flex-col h-full w-full min-h-[100vh]" v-else>
    <router-view/>
  </div>

</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/modules/auth-store'
import { useRoute } from 'vue-router';

const { user } = storeToRefs(useAuthStore())

const $route = useRoute()
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
    height: 100%;
    min-height: calc(100dvh - 80px);

    &__content {
      @apply w-full h-full max-w-[1440px] mx-auto sm:mt-[30px];

    }
  }

  .hr-view {

  }
</style>

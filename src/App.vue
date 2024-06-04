<template>
  <!-- Клиентская часть -->
  <div class="client-view" v-if="true">
    <AppHeader />

    <div class="client-view__content">
      <RouterView class="content"/>
    </div>
  </div>

  <!-- Возможно hr панель -->
  <div></div>
</template>

<style lang="scss">
  #app {
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
  }

  .client-view {
    @apply h-full w-full flex flex-col bg-extra-light-gray;
    height: 100%;
    min-height: 100vh;

    &__content {
      @apply w-full h-full max-w-[1820px] mx-auto mt-[30px];

    }
  }
</style>

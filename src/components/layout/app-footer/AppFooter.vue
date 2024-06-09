<template>
  <div class="app-footer">
    <AppNavMini />
  </div>
</template>

<style lang="scss" scoped>
  .app-footer {
    @apply h-[83px] z-[1000] fixed left-0 bottom-0 w-full py-[7px] px-[20px];
    box-shadow: 0px -0.33px 0px 0px rgba(0, 0, 0, 0.3);
    background-color: rgba(#fff, 0.75);
    backdrop-filter: blur(5px);
  }
</style>

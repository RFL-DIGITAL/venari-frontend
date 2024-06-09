<template>
  <Teleport to="header">
    <div class="app_header__mobile sm:hidden">
      <Image src="/public/images/logo.png" alt="logo" width="139" />

      <div class="flex items-center">
        <i v-if="isSearch"          
          class="w-[24px] h-[24px] icon-[outlined/search]"
          @click="$emit('search')"
        />

        <NotificationContainer />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  interface AppMobileHeader {
    isSearch: boolean
  }

  defineProps<AppMobileHeader>()

  const $emit = defineEmits<{
    (e: 'search'): void
  }>()
</script>

<style scoped lang="scss">
.app_header__mobile {
  @apply flex w-full h-full justify-between items-end h-full px-[15px] py-[20px];
}
</style>

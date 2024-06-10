<template>
  <Teleport to="header">
    <div class="app_header__mobile sm:hidden">
      <slot>
        <Image src="/public/images/logo.png" alt="logo" width="139" />
      </slot>

      <div class="flex items-center gap-x-[20px]">
        <i v-if="search"          
          class="w-[26px] h-[30px] icon-[outlined/search] !mt-[6px]"
          @click="$emit('search')"
        />

        <NotificationContainer v-if="!hideNotification"/>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  interface AppMobileHeader {
    search: boolean
    hideNotification: boolean
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

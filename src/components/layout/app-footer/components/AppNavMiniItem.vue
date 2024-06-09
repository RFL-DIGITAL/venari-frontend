<template>
  <router-link :to="props.to">
    <div class="app-nav__mini__item" :class="{'!text-blue': isNavItemActive }">
      <i :class="icon" class="h-[23px] w-[40px]"></i>
      {{ text }}

    </div>
  </router-link>
</template>

<script lang="ts" setup>
  // Types
  import type { AppNavListItem } from '../model/types'

  // Hooks
  import { useIsNavItemActive } from '@/utils/hooks/use-is-nav-item-active'


  const props = defineProps<AppNavListItem>()

  const { isNavItemActive } = useIsNavItemActive(props)
</script>

<style scoped lang="scss">
.app-nav__mini__item {
  @apply flex flex-col gap-y-[6px] text-xs text-gray items-center;
}
</style>

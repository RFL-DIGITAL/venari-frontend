<template>
  <div class="app-nav-mini flex justify-evenly w-full">
    <AppNavMiniItem
      v-for="(item, i) in list"
      :key="i"
      v-bind="item"
      class="app-nav-mini__item"
    />
  </div>
</template>

<script setup lang="ts">
  // Core
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia';
  
  // Store
  import { useAuthStore } from '@/stores/modules/auth-store';

  // Types
  import type { AppNavListItem } from '../model/types'


  const { user } = storeToRefs(useAuthStore())

  const list = computed((): AppNavListItem[] => {
    const menu: AppNavListItem[] = []

    menu.push({
      icon: 'icon-[outlined/today]',
      text: 'Сегодня',
      to: '/feed',
    })

    menu.push({
      icon: 'icon-[outlined/bag]',
      text: 'Вакансии',
      to: '/vacancy',
    })

    menu.push({
      icon: 'icon-[outlined/chat]',
      text: 'Чаты',
      to: '/chats',
    })

    menu.push({
      icon: 'icon-[outlined/networking]',
      text: 'Нетворкинг',
      to: '/networking',
    })

    if(user)
      menu.push({
        icon: 'icon-[outlined/profile]',
        text: 'Профиль',
        to: `/profile/${user.value?.id}`,
      })

    return menu
  })
</script>

<style lang="scss" scoped>
  .app-nav-mini {
    gap: 4px;

    &__item {
      flex: 1;
    }
  }
</style>

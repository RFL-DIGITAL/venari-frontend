<template>
  <Menubar :model="items" class="app-header h-20">
    <template #start>
      <Image src="/public/images/logo.png" alt="logo" width="200" />
    </template>
    <template #item="{item, props }">
      <router-link
        v-ripple
        class="flex align-items-center"
        v-bind="props.action"
        :to="item.route"
        :replace="true"
      >
        <span class="w-[24px] h-[24px]":class="isRouteIncludeChildsActive(item.route) ? item.activeIcon : item.icon" />
        <span class="ml-2 font-medium">{{ item.label }}</span>
        <span
          v-if="item.shortcut"
          class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
          >{{ item.shortcut }}</span
        >
      </router-link>
    </template>
    <template #end>
      <div class="flex items-center gap-2 gap-x-[70px]">
        <BaseSearch/>
        <UserAvatar />
      </div>
    </template>
  </Menubar>
</template>

<script setup>
  // Core
  import { ref } from 'vue'

  // Hooks
  import { useIsActiveRoutePath } from '@/utils/hooks/use-is-active-route-path'

  const items = ref([
    {
      label: 'Сегодня',
      icon: 'icon-[outlined/chat]',
      activeIcon: 'icon-[filled/chat]',
      route: '/home',
    },
    {
      label: 'Вакансии',
      icon: 'icon-[outlined/chat]',
      activeIcon: 'icon-[filled/chat]',
      route: '/job-openings',
    },
    {
      label: 'Чаты',
      icon: 'icon-[outlined/chat]',
      activeIcon: 'icon-[filled/chat]',
      route: '/chats',
    },
    {
      label: 'Новости',
      icon: 'icon-[outlined/chat]',
      activeIcon: 'icon-[filled/chat]',
      route: '/news',
    },
    {
      label: 'Нетворкинг',
      icon: 'icon-[outlined/chat]',
      activeIcon: 'icon-[filled/chat]',
      route: '/networking',
    },
  ])

  const { isRouteIncludeChildsActive }  = useIsActiveRoutePath()
</script>

<style lang="scss">
  @layer app {
    .app-header {
      .p-menubar-root-list {
        @apply flex items-center w-full h-full gap-x-[20px] mx-[40px];
      }

      .p-menuitem-content {
        @apply m-0 rounded-[10px] border-2 border-light-gray;
        transition: all linear 150ms;

        * {
          transition: all linear 150ms;
        }
      }
    }

    .p-menubar .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus>.p-menuitem-content {
        @apply bg-white text-black;
    }

    .p-menubar .p-menubar-root-list>.p-menuitem:not(.p-highlight):not(.p-disabled)>.p-menuitem-content:hover {
        @apply text-black border-extra-light-gray;
        background: var(--extra-light-gray);

        * {
            @apply text-black;
        }
    }

    .p-menuitem-content:has(.router-link-active) {
        @apply text-white border-blue;
        background: var(--blue) !important;

        * {
            @apply text-white;
        }
    }
  }
</style>

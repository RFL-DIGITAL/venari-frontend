<template>
  <header
    v-if="typeof isHr === 'boolean'"
    class="app-header"
    :class="{ hr: isHr }"
  >
    <Menubar :model="items" class="h-20 sm:flex hidden">
      <template #start>
        <router-link to="/">
          <Logo :white="isHr" />
        </router-link>
      </template>
      <template #item="{ item, props }">
        <router-link
          v-bind="props.action"
          :to="item.route"
          :replace="true"
        >
          <span
            class="w-[24px] h-[24px]"
            :class="
              isRouteIncludeChildsActive(item.route)
                ? item.activeIcon
                : item.icon
            "
          />
          <span class="ml-2 font-medium">{{ item.label }}</span>
          <span
            v-if="item.shortcut"
            class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
            >{{ item.shortcut }}</span
          >
        </router-link>
      </template>
      <template #end>
        <div class="flex items-center justify-between gap-2 gap-x-[70px]">
          <BaseSearch v-if="!isHr" />

          <div class="flex items-center gap-x-[16px]">
            <NotificationContainer />

            <BaseButton label="Выйти" @click="logout" />

            <EntityAvatar v-if="user" :image="user?.image?.image" :to="{name: 'profile', params: { id: user.id }}"/>
          </div>
        </div>
      </template>
    </Menubar>
  </header>
</template>

<script setup>
  // Core
  import { ref, computed } from 'vue'

  // Hooks
  import { useIsActiveRoutePath } from '@/utils/hooks/use-is-active-route-path'
  import { useAuthStore } from '@/stores/modules/auth-store'
  import { useRouter } from 'vue-router'

  const { isRouteIncludeChildsActive } = useIsActiveRoutePath()

  const { user } = useAuthStore()

  const isHr = computed(() => isRouteIncludeChildsActive('/hr'))

  const items = computed(() => {
    if (isHr.value) return getHrRoutes()
    else return getBaseRoutes()
  })

  function getHrRoutes() {
    return [
      {
        label: 'На главную',
        icon: 'icon-[outlined/chat]',
        activeIcon: 'icon-[filled/chat]',
        route: '/',
      },
      {
        label: 'Вакансии',
        icon: 'icon-[outlined/chat]',
        activeIcon: 'icon-[filled/chat]',
        route: '/hr/vacancy',
      },
      {
        label: 'Кандидаты',
        icon: 'icon-[outlined/chat]',
        activeIcon: 'icon-[filled/chat]',
        route: '/hr/candidate',
      },
      {
        label: 'Календарь',
        icon: 'icon-[outlined/chat]',
        activeIcon: 'icon-[filled/chat]',
        route: '/hr/calendar',
      },
      {
        label: 'Публикации',
        icon: 'icon-[outlined/chat]',
        activeIcon: 'icon-[filled/chat]',
        route: '/hr/publications',
      },
    ]
  }

  function getBaseRoutes() {
    return [
      {
        label: 'Сегодня',
        icon: 'icon-[outlined/chat]',
        activeIcon: 'icon-[filled/chat]',
        route: '/feed',
      },
      {
        label: 'Вакансии',
        icon: 'icon-[outlined/chat]',
        activeIcon: 'icon-[filled/chat]',
        route: '/vacancy',
      },
      {
        label: 'Чаты',
        icon: 'icon-[outlined/chat]',
        activeIcon: 'icon-[filled/chat]',
        route: '/chats',
      },
      {
        label: 'Нетворкинг',
        icon: 'icon-[outlined/chat]',
        activeIcon: 'icon-[filled/chat]',
        route: '/networking',
      },
    ]
  }

  const $router = useRouter()
  function logout() {
    useAuthStore().logout()
  }
</script>

<style lang="scss">
  @layer app {
    /* BASE */
    .app-header {
      @apply fixed top-0 left-0 right-0 z-[10000] h-[80px] bg-white border-b border-light-gray;

      .p-menubar-root-list {
        @apply flex items-center w-full h-full gap-x-[20px] mx-[40px];
      }

      .p-menuitem-content {
        @apply m-0 rounded-[10px] border border-light-gray;
        transition: all linear 250ms;

        * {
          transition: all linear 250ms;
        }
      }
    }

    .p-menuitem > .p-menuitem-content .p-menuitem-link {
      @apply p-2.5;
    }

    .p-menuitem {
      @apply h-[44px] m-0;
    }

    .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus
      > .p-menuitem-content {
      @apply bg-white text-black;
    }

    .p-menuitem:not(.p-highlight):not(.p-disabled):not(
        :has(.router-link-active)
      )
      > .p-menuitem-content:hover {
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

    /* HR */
    .app-header.hr {
      .p-menubar {
        @apply bg-hr-black;
      }

      .p-menuitem-content {
        @apply text-white bg-dark-gray;

        * {
          @apply text-white;
        }
      }

      /* TODO: убрать has */
      .p-menuitem-content:has(.router-link-active) {
        @apply text-black border-extra-light-gray;
        background: var(--extra-light-gray) !important;

        * {
          @apply text-black;
        }
      }

      .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus
        > .p-menuitem-content {
        @apply bg-gray text-white;
      }
      
      .button-notification {
        & * {
          @apply text-white;
        }
      }
    }
  }
</style>

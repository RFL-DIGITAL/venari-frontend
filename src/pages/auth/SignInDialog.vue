<template>
  <Dialog
    :draggable="false"
    class="sign-in-dialog"
    :visible="_visible"
    modal
    header="Войти в аккаунт Venari"
    @update:visible="close"
  >
    <template #header>
      <div class="block">
        <p class="text-lg">Войти в аккаунт Venari</p>
        <p class="text-xs text-gray w-[260px]">
          Войдите в аккаунт или зарегистрируйтесь для доступа ко всем
          возможностям
        </p>
      </div>
    </template>

    <template #default>
      <form
        @submit.prevent="handleLogin"
        class="flex flex-col gap-y-[15px] my-auto grow h-full"
      >
        <div>
          <p class="text-gray text-sm font-bold mb-[7px]">Логин</p>
          <BaseInputWithValidation
            label="Email или имя пользователя"
            white
            name="username"
            type="email"
          />
        </div>

        <div>
          <p class="text-gray text-sm font-bold mb-[7px]">Пароль</p>
          <BaseInputWithValidation label="Пароль" white type="password" name="password" />
        </div>

        <div class="flex justify-center w-full gap-x-2.5 mt-auto">
          <BaseButton label="Войти" type="submit" />

          <router-link :to="{name: 'sign-up'}" @click.prevent="() => { $router.push({name: 'sign-up'}); close(); }">
              <SecondButton label="Создать аккаунт" />
          </router-link>
        </div>
      </form>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue'
  // Core
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'

  // Types
  import { AuthRequest } from '@/stores/types/schema'

  // Store
  import { useAuthStore, LoginRequest } from '@/stores/modules/auth-store'

  interface Form extends LoginRequest {}

  interface NotificationDialog {
    visible: boolean
  }

  const props = defineProps<NotificationDialog>()

  const $emit = defineEmits<{
    (e: 'update:visible', value: boolean): void
    (e: 'submit'): void
  }>()

  const userStore = useAuthStore()
  const $router = useRouter()

  const { values, validate } = useForm<Form>({
    validationSchema: {
      username: 'required|email',
      password: 'required',
    },
  })

  const handleLogin = async () => {
    try {
      const { valid } = await validate()

      if (valid) {
        await userStore.login(values)
        window.location.reload()
        /* $emit('submit')
        close() */
      }
    } catch (error) {
      console.log(error)
    }
  }

  const _visible = computed({
    get() {
      return props.visible
    },
    set(value: boolean) {
      $emit('update:visible', value)
    },
  })

  function close() {
    _visible.value = false
  }

  function handleOutsideClick(event: any) {
    const element = document.querySelector('.p-dialog')
    if (!element?.contains(event.target)) {
      close()
    }
  }

  onMounted(() => {
    hideScroll()
    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick)
    }, 1)
  })

  onUnmounted(() => {
    showScroll()
    document.removeEventListener('click', handleOutsideClick)
  })

  function hideScroll() {
    document.documentElement.style.overflow = 'hidden'
  }

  function showScroll() {
    document.documentElement.style.overflow = 'auto'
  }
</script>

<style lang="scss">
  .sign-in-dialog {
    @apply rounded-[15px];
    color: var(--black) !important;
    width: 440px;
    height: 380px;
    top: calc(50% - 190px);
    z-index: 2001;

    & > * {
      color: var(--black);
    }

    .p-dialog-header-icons {
      @apply self-start;
    }

    .p-dialog-header-close {
      @apply icon-[outlined/close] w-[24px] h-[24px] text-black outline-none mb-0;

      .p-dialog-header-close-icon {
        display: none;
      }
    }

    .p-dialog-content {
      @apply h-full grow;
    }
  }

  .p-component-overlay {
    @apply cursor-pointer z-[1000] relative;
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.15) !important;
  }

  .cv-dialog__scroll {
    height: 100%;
    max-height: calc(100vh - 268px);
  }
</style>

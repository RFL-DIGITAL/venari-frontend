<template>
  <div class="sign-up-page">
    <PageTitle class="hidden sm:block" title="Создание аккаунта Venari" />

    <form @submit.prevent="handleRegister">
      <div>
        <p class="text-gray text-sm font-bold mb-[7px]">Фамилия</p>
        <BaseInputWithValidation label="Фамилия" white name="username" />
      </div>

      <div>
        <p class="text-gray text-sm font-bold mb-[7px]">Имя</p>
        <BaseInputWithValidation label="Имяя" white name="username" />
      </div>

      <div>
        <p
          class="text-gray text-sm font-bold mb-[7px] flex justify-between items-center"
        >
          Отчество <span class="text-xs text-gray">необязательно</span>
        </p>
        <BaseInputWithValidation label="Отчество" white name="username" />
      </div>

      <div class="border-b-2 border-extra-light-gray w-full col-span-2" />

      <div>
        <p class="text-gray text-sm font-bold mb-[7px]">Email</p>
        <BaseInputWithValidation
          label="Email"
          white
          name="username"
          type="email"
        />
      </div>

      <div>
        <p class="text-gray text-sm font-bold mb-[7px]">Телефон</p>
        <BaseInputWithValidation
          label="Телефон"
          white
          name="username"
          type="tel"
        />
      </div>

      <div>
        <p
          class="text-gray text-sm font-bold mb-[7px] flex justify-between items-center"
        >
          Имя пользователя <span class="text-xs text-gray">необязательно</span>
        </p>
        <BaseInputWithValidation label="@username" white name="username" />
      </div>

      <div class="flex col-span-2 mt-auto gap-x-[15px] h-[44px]">
        <BaseButton
          label="Зарегистрироваться"
          type="submit"
          @click="handleRegister"
        />

        <SecondButton label="Загрузить картинку" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  // Core
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'

  // Types
  import { RegisterUserRequest } from '@/stores/types/schema'

  // Store
  import { useAuthStore } from '@/stores/modules/auth-store'

  interface Form extends RegisterUserRequest {}

  const userStore = useAuthStore()
  const $router = useRouter()

  const { values, validate } = useForm<Form>({
    validationSchema: {
      email: 'required|email',
      login: 'required',
      password: 'required',
    },
  })

  const handleRegister = async () => {
    try {
      const { valid } = await validate()

      if (valid) {
        await userStore.register(values)
        $router.push('/')
      }
    } catch (error) {}
  }
</script>

<style scoped lang="scss">
  .sign-up-page {
    @include page-container-main-right;

    form {
      @apply grid bg-white w-6/12 h-full col-span-2 p-[30px] rounded-[15px] grid-cols-2 gap-[25px];
    }
  }
</style>

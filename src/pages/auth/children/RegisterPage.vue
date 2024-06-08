<template>
  <div
    class="flex flex-col h-full items-center mt-8 mx-auto p-[20px] bg-light-gray rounded-[20px]"
  >
    <VForm
      class="w-full flex flex-col gap-y-[20px]"
      @submit.prevent="handleRegister"
    >
      <BaseInputWithValidation
        name="email"
        type="email"
        label="Электронная почта"
      />

      <BaseInputWithValidation name="login" type="login" label="Логин" />

      <BaseInputWithValidation label="Пароль" name="password" type="password" />

      <RouterLink :to="{ name: 'auth.login' }">
        <p class="text-blue cursoir-pointer">Авторизоваться</p>
      </RouterLink>

      <BaseButton
        class="w-full"
        label="Зарегистрироваться"
        type="submit"
        @click="handleRegister"
      />
    </VForm>
  </div>
</template>

<script lang="ts" setup>
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

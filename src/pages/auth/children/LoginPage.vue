<template>
  <div
    class="flex flex-col h-full items-center mt-8 mx-auto p-[20px] bg-light-gray rounded-[20px]"
  >
    <VForm
      class="w-full flex flex-col gap-y-[20px]"
      @submit.prevent="handleLogin"
    >
      <BaseInputWithValidation
        name="username"
        type="email"
        label="Электронная почта"
      />

      <BaseInputWithValidation label="Пароль" name="password" type="password" />

      <RouterLink :to="{ name: 'auth.register' }">
        <p class="text-blue cursoir-pointer">Регистрация</p>
      </RouterLink>

      <BaseButton class="w-full" label="Авторизоваться" type="submit" @click="handleLogin"/>
    </VForm>
  </div>
</template>

<script lang="ts" setup>
  // Core
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'
  
  // Types
  import { AuthRequest } from '@/stores/types/schema'
  
  // Store
  import { useAuthStore, LoginRequest } from '@/stores/modules/auth-store'
  
  interface Form extends LoginRequest {}

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
        $router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
</script>

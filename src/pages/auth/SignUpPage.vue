<template>
  <div class="sign-up-page">
    <PageTitle class="hidden sm:block" title="Создание аккаунта Venari" />

    <div class="form">
      <div>
        <p class="text-gray text-base font-bold mb-[7px]">Фамилия</p>
        <BaseInputWithValidation label="Фамилия" white name="lastName" />
      </div>

      <div>
        <p class="text-gray text-base font-bold mb-[7px]">Имя</p>
        <BaseInputWithValidation label="Имя" white name="firstName" />
      </div>

      <div>
        <p
          class="text-gray text-base font-bold mb-[7px] flex justify-between items-center"
        >
          Отчество <span class="text-xs text-gray">необязательно</span>
        </p>
        <BaseInputWithValidation label="Отчество" white name="middleName" />
      </div>

      <div>
        <p
          class="text-gray text-base font-bold mb-[7px] flex justify-between items-center"
        >
          Дата рождения <span class="text-xs text-gray">необязательно</span>
        </p>
        <BaseDatePickerWithValidation
          label="Дата рождения"
          white
          name="birthDate"
          dateFormat="dd.mm.yy"
          view="date"
        />
      </div>

      <div class="border-b-2 border-extra-light-gray w-full col-span-2" />

      <div>
        <p class="text-gray text-base font-bold mb-[7px]">Email</p>
        <BaseInputWithValidation
          label="Email"
          white
          name="email"
          type="email"
        />
      </div>

      <div>
        <p
          class="text-gray text-base font-bold mb-[7px] flex justify-between items-center"
        >
          Телефон <span class="text-xs text-gray">необязательно</span>
        </p>
        <BaseInputWithValidation
          label="Телефон"
          white
          name="phone"
          type="tel"
        />
      </div>

      <div>
        <p class="text-gray text-base font-bold mb-[7px]">Пароль</p>
        <BaseInputWithValidation
          label="Пароль"
          white
          name="password"
          type="password"
        />
      </div>

      <div>
        <p class="text-gray text-base font-bold mb-[7px]">Имя пользователя</p>
        <BaseInputWithValidation label="@username" white name="userName" />
      </div>

      <div class="flex items-center gap-x-[10px]">
        <p class="text-gray text-base font-bold mb-[7px]">Фото профиля</p>

        <BaseUploadWithValidation
          class="mb-1.5"
          label="Загрузить фото"
          name="image"
        />
      </div>
      <div class="flex justify-end">
        <BaseSelectButtonWithValidation :options="options" name="sex" />
      </div>

      <div class="col-span-2">
        <div class="flex mt-auto gap-x-[15px] h-[44px]">
          <BaseButton
            label="Создать резюме"
            type="submit"
            ic
            @click="handleCreateResume"
          />

          <SecondButton label="Загрузить резюме" @click="handleUploadResume" />
        </div>

        <Button text plain class="mt-2.5" @click="handleLate">
          <span class="text-red text-xs"> Добавить позже в настройках </span>
        </Button>
      </div>
    </div>
  </div>

  <ResumeUploadDialog ref="resumeUploadDialog" />
</template>

<script setup lang="ts">
  // Core
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'

  // Types
  import { RegisterUserRequest } from '@/stores/types/schema'
  import useNotify from '@/utils/hooks/useNotify'
  import ResumeUploadDialog from '@/components/cv/ResumeUploadDialog.vue'

  // Store
  import { useAuthStore } from '@/stores/modules/auth-store'

  const { notifyError } = useNotify()

  import { ref } from 'vue'

  const resumeUploadDialog = ref<InstanceType<
    typeof ResumeUploadDialog
  > | null>(null)

  interface Form extends RegisterUserRequest {}

  const userStore = useAuthStore()
  const $router = useRouter()

  const { values, validate, errors } = useForm<Form>({
    validationSchema: {
      email: 'required|email',
      password: 'required',
      firstName: 'required',
      lastName: 'required',
      birthDate: 'required',
      userName: 'required',
      sex: 'required',
    },
    initialValues: {
      sex: true,
    },
  })

  const options = [
    {
      id: true,
      name: 'Мужчина',
    },
    {
      id: false,
      name: 'Женщина',
    },
  ]

  const handleRegister = async () => {
    try {
      const { valid } = await validate()
      if (valid) {
        return await userStore.register(values)
      }
    } catch (error) {}
  }

  const handleUploadResume = async () => {
    await handleRegister().then(async (user) => {
      const file = await resumeUploadDialog.value?.open('Загрузка резюме')
      useAuthStore().createResume(file)
    })
    $router.push('/')
  }

  const handleCreateResume = async () => {
    await handleRegister()
      .then((user) => {
        $router.push({ name: 'profile-resume.create', params: { id: user.id } })
      })
      .catch(notifyError)
  }

  const handleLate = async () => {
    await handleRegister().then(() => {
      $router.push('/')
    })
  }
</script>

<style scoped lang="scss">
  .sign-up-page {
    @include page-container-main-right;

    .form {
      @apply grid bg-white w-6/12 h-full col-span-2 p-[30px] rounded-[15px] grid-cols-2 gap-[25px];
    }
  }
</style>

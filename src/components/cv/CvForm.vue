<template>
  <div class="cv-form">
    <div class="cv-form__content">
      <div class="cv-form__content__header">
        <img class="cv-form__content__header-img"/>

        <div class="cv-form__content__header-info">
          <div class="flex flex-col">
            <p class="text-base font-bold">Федоров Михаил Евгеньевич</p>
            <div class="flex gap-y-[5px] gap-x-[10px]">
              <span class="text-xs">21.02.1992, Мужчина</span>
              <span class="text-xs text-gray">г. Кемерово, Кемеровская область, Россия</span>
            </div>
          </div>

          <div class="flex flex-col">
            <div class="text-sm">
              <b class="font-bold">E-mail: </b>
              <span>michfed@gmail.com</span>
            </div>

            <div class="text-sm">
              <b class="font-bold">Телефон: </b>
              <span>+7 (999) 888-77-66</span>
            </div>
          </div>
        </div>

        <Image class="cv-form__content__header-logo" src="/public/images/logo.png" alt="logo" width="139" />
      </div>

      <p class="title-separator">Желаемая должность</p>

      <div class="cv-form__content__work-experience"></div>

      <p class="title-separator h-[100vh]">Образование</p>

      <div class="cv-form__content__work-education">
        <div v-for="i in 100" :key="i">1224</div>
      </div>

      <p class="title-separator">Навыки и языки</p>

      <div class="cv-form__content__skills"></div>

      <p class="title-separator h-[100vh]">Навыки и языки</p>

      <div class="cv-form__content__additionally"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    withHeader: boolean
  }

  defineProps<Props>()
</script>

<style scoped lang="scss">
  .cv-form {
    @apply w-full h-full flex flex-col gap-y-[20px];

    &__content {
      @apply w-full h-full flex flex-col border-b border-light-gray gap-y-10;

      &__header {
        @apply grid gap-x-[20px];

        grid-template-columns: 130px auto 140px;

        &-img {
          @apply w-full aspect-square rounded-[10px] bg-gray;
        }

        &-info {
          @apply flex flex-col gap-y-[25px] my-auto;
        }

        &-logo {
          @apply mt-[30px];
        }

      }

    }

    .title-separator {
      @apply w-full text-sm font-bold text-blue border-b border-light-gray pb-[5px];
    }
  }
</style>

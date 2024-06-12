<template>
  <div class="hr-vacancy-page">
    <HrSidebar />

    <div class="hr-vacancy-page__content">
      <div class="hr-vacancy-page__content__header">
        <SelectButton />

        <div class="flex items-center gap-x-[10px]">
          <BaseButton
            label="Создать вакансию"
            leftIcon="icon-[outlined/plus]"
          />

          <SecondButton label="Выбрать" leftIcon="icon-[outlined/check-list]" />
          <SecondButton
            label="Выбрать все"
            leftIcon="icon-[outlined/success]"
          />
        </div>
      </div>

      <div class="mt-5">
        <BaseScroll class="hr-vacancy__scroll">
          <Table />
        </BaseScroll>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .hr-vacancy-page {
    max-height: 100dvh;
    @include page-hr-container;
    @apply pb-0 mx-auto;

    &__content {
      @apply flex flex-col;

      &__header {
        @apply flex justify-between;
      }
    }
  }

  .hr-vacancy__scroll {
    max-height: calc(100dvh - 157px);
  }
</style>

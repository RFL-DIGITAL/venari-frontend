<template>
  <div class="profile-resume__create-page">
    <PageTitle title="Создание резюме" />

    <div class="px-[25px] py-5 bg-white rounded-[15px]">
      <ResumeForm />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .profile-resume__create-page {
    @include page-container-main-left;
  }
</style>

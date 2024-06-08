<!-- TODO: Жду шрифты -->
<template>
  <div class="feed-page">
    <div class="feed-page__posts-container">
      <RouterView />
    </div>

    <div class="feed-page__sidebar">
      <div>
        <PageNavigation label="Чаты" :to="{ name: 'chats' }" />

        <div class="feed-page__sidebar__card">
          <ChatPreview />
        </div>
      </div>

      <div>
        <PageNavigation label="Вакансии" :to="{ name: 'vacancy' }" />

        <div class="feed-page__sidebar__card">
          <VacancyPreview />
        </div>
      </div>

      <div>
        <PageNavigation label="Нетворкинг" :to="{ name: 'networking' }" />

        <div class="feed-page__sidebar__card">
          <NetworkingPreview />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .feed-page {
    @include page-container-main-left;
    padding-bottom: 10vh;

    & > *:nth-child(1) {
      max-width: 874px;
    }

    &__sidebar {
      @apply flex flex-col gap-y-[25px];

      &__card {
        @apply flex flex-col w-full bg-white px-[16px] py-[17px] rounded-[15px];
      }
    }
  }
</style>

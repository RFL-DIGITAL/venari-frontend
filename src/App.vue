<template>
  <!-- Клиентская часть -->
  <div class="client-view" v-if="true">
    <AppHeader/>
  
    <RouterView />
  </div>

  <!-- Возможно hr панель -->
  <div></div>
</template>

<script setup></script>

<style scoped></style>

<template>
  <div class="flex flex-col gap-y-[25px]">
    <Post v-for="i in 15" :key="i" preview/>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

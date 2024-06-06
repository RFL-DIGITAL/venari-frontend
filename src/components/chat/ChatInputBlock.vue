<template>
  <div class="flex items-center gap-x-[30px]">
    <ButtonFileUpload v-model:files="files"/>

    <InputText
      class="w-full"
      v-model="message"
      placeholder="Введите сообщение"
      type="text"
      v-on:keyup.enter=""
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const files = ref([])
const message = ref()


</script>

<style scoped></style>

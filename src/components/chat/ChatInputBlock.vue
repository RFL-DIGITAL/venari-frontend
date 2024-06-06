<template>
  <div class="flex items-center gap-x-[30px]">
    <ButtonFileUpload v-model:file="file" @update:file="handleFileUpload"/>

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

const file = ref()
const message = ref()

function handleFileUpload() {
    console.log(1)
    console.log(file.value)
}
</script>

<style scoped></style>

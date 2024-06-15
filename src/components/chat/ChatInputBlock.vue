<template>
  <div class="flex items-center gap-x-[30px]">
    <ButtonFileUpload v-model:file="file" @update:file="handleFileUpload"/>

    <InputText
      class="w-full"
      v-model="_message"
      placeholder="Введите сообщение"
      type="text"
      v-on:keyup.enter="$emit('enter', _message, file)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const file = ref()
const message = ref()

interface Props {
    message: string
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:message', value: string): void
    (e: 'enter', body: string, image: string): void
  }>()

  const _message = computed({
    get() {
      return props.message
    },
    set(value: string) {
      $emit('update:message', value)
    },
  })

function handleFileUpload() {
    console.log(1)
    console.log(file.value)
}

</script>

<style scoped></style>

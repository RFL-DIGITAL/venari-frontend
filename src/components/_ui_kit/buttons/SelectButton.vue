<template>
  <SelectButton
    v-model="value"
    :options="options"
    optionLabel="name"
    dataKey="id"
    aria-labelledby="custom"
  />
</template>

<script setup lang="ts">
  import SelectButton from 'primevue/selectbutton'
  import { ref } from 'vue'

  const value = ref(null)
  const options = ref([
    { name: 'Активные', id: 1 },
    { name: 'Черновики', id: 2 },
    { name: 'Архивные', id: 3 },
  ])
</script>

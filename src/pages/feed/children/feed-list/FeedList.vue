<template>
  <div class="flex flex-col gap-y-[25px]">
    <Post v-for="i in 15" :key="i" preview/>
  </div>
</template>

<script setup lang="ts">
/* TODO: Прокидывать со страницы постов и юзеров свой fetchData и имлементировать стор в родителе */
interface Props {
  fetchData: () => void
}
</script>

<style scoped></style>

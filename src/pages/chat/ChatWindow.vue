<template>
  <div class="chat-window">
    <div class="overflow-y">
      <ChatMessage />
      <ChatMessage />
      <ChatMessage me />
    </div>
    <div class="flex items-center gap-x-[30px]">
        <div>X</div>

        <InputText class="w-full"
          v-model="_value"
          placeholder="Введите сообщение"
          type="text"
        />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.chat-window {
    @apply h-full grid gap-y-[20px];
    grid-template-rows: auto 44px;
}
</style>

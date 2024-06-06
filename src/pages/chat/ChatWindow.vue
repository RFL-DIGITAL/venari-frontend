<template>
  <div class="chat-window">
    <div class="overflow-y">
      <ChatMessage />
      <ChatMessage />
      <ChatMessage me />
    </div>
    <ChatInputBlock/>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.chat-window {
    @apply h-full grid gap-y-[20px];
    grid-template-rows: auto 44px;
}
</style>

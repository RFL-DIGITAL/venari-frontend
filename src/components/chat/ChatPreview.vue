<template>
    <div class="chat-preview">
        <ChatPreviewCard v-for="i in chats" :key="i" :data="i"/>
    </div>
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import ChatPreview from './types';

interface ChatPreviewProps {
  chats: Array<ChatPreview>;
} 

defineProps<ChatPreviewProps>();

</script>


<script lang="ts">

onMounted(() => {
    console.log();
    
})
</script>

<style scoped>
.chat-preview {
    @apply flex flex-col gap-y-[15px];
}
</style>
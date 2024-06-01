<template>
    <div>
        {{ base }}
    </div>
</template>

<script setup lang="ts">
interface Props {
    base: string
}

withDefaults(defineProps<Props>(), {
    base: '123',
})
</script>

<style scoped>

</style>
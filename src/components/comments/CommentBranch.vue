<template>
    <div class="comment-branch" :class="{ last: last }">
        <div class="comment-branch__arch"></div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    last: boolean
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.comment-branch {
    @apply w-[2px] h-full border-r-2 border-light-gray;

    &__arch {
        @apply relative w-[20px] border-light-gray border-l-2 border-b-2 /* ml-[16.5px] */;
        border-bottom-left-radius: 15px;
        height: calc(100% - 35px);

        /* &::before {
            @apply absolute w-[35px] border-light-gray border-l-2;
            content: '';
            height: 45px;
            top: -45px;
            left: -2px;
        } */
    }
}

.comment-branch.last {
    border-color: transparent;
}

</style>
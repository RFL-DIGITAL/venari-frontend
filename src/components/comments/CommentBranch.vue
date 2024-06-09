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
      @apply relative sm:w-[20px] w-[5px] border-light-gray border-l-2 border-b-2;
      border-bottom-left-radius: 15px;
      height: calc(100% - 35px);
    }
  }

  .comment-branch.last {
    border-color: transparent;
  }
</style>

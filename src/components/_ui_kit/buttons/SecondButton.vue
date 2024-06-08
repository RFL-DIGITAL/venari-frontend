<template>
  <Button class="second-button" v-bind="$attrs">
    <div class="flex items-center gap-x-[5px]">
      <div v-if="leftIcon" :class="`text-black w-[20px] h-[20px] icon-[${leftIcon}]`" />

      <slot>{{ label }}</slot>

      <div v-if="rightIcon" :class="`text-black w-[20px] h-[20px] icon-[${rightIcon}]`" />
    </div>
  </Button>
</template>

<script setup lang="ts">
  interface Props {
    label: string
    leftIcon?: string
    rightIcon?: string
  }

  defineProps<Props>()
</script>

<style scoped></style>

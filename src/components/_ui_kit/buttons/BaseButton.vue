<template>
  <Button class="base-button" v-bind="$attrs" :disabled="disabled">
    <div class="flex items-center gap-x-[5px]">
      <div v-if="leftIcon" :class="`w-[20px] h-[20px] icon-[outlined/${leftIcon}]`" />

      <slot>{{ label }}</slot>

      <div v-if="rightIcon" :class="`w-[20px] h-[20px] icon-[outlined/${rightIcon}]`" />
    </div>
  </Button>
</template>

<script setup lang="ts">
  interface Props {
    label: string
    leftIcon?: string
    rightIcon?: string
    disabled?: boolean
  }

  defineProps<Props>()
</script>

<style scoped></style>

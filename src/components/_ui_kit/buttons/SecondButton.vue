<!-- TODO: Вынести иконки в отдельный компонент -->
<template>
  <Button class="second-button" v-bind="$attrs">
    <div class="flex items-center gap-x-[5px]">
      <div
        v-if="leftIcon"
        :class="`text-black ${leftIcon}`"
        :style="`height: ${iconSize}px; width: ${iconSize}px;`"
      />

      <slot>{{ label }}</slot>

      <div
        v-if="rightIcon"
        :class="`text-black ${rightIcon}`"
        :style="`height: ${iconSize}px; width: ${iconSize}px;`"
      />
    </div>
  </Button>
</template>

<script setup lang="ts">
  interface Props {
    label: string
    leftIcon?: string
    rightIcon?: string
    iconSize?: number
  }

  withDefaults(defineProps<Props>(), {
    iconSize: 20,
  })
</script>

<style scoped lang="scss"></style>

<template>
  <SplitButton :model="options">
    <template #menubuttonicon>
      <div class="flex items-center justify-between gap-x-4">
        <p>{{ label }}</p>
        <i class="w-[11px] h-[16px] icon-[outlined/arrow-right] rotate-90"/>
      </div>
    </template>
  </SplitButton>
</template>

<script setup lang="ts">
  import SplitButton from 'primevue/splitbutton'

  interface ISplitButton {
    label: string
    command: () => void
  }

  interface Props {
    options: ISplitButton[]
    label: string
  }

  defineProps<Props>()
</script>

<style lang="scss">
.p-splitbutton {
  @apply min-w-[160px];
}

.p-splitbutton-defaultbutton {
  display: none;
}

.p-splitbutton-menubutton {
  @apply min-w-[160px] rounded-[10px];
  background: var(--blue);
  border-color: var(--blue);
}
</style>

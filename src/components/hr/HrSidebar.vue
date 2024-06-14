<template>
  <div class="hr-sidebar">
    <div class="hr-sidebar__header">
      <slot name="header">
        <BaseSearch v-model="_search" class="!w-full"/>
        <Button plain text class="self-end mt-[9px]">
            <span class="underline text-white">Продвинутый поиск</span>
        </Button>
      </slot>
    </div>

    <div class="hr-sidebar__body">
      <slot name="body"></slot>
    </div>

    <div class="hr-sidebar__footer">
      <slot name="footer">
        <SecondButton
          label="Редактировать категории"
          @click="$emit('editCategory')"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    search: string
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:search', value: string): void
    (e: 'editCategory'): void
  }>()

  const _search = computed({
    get() {
      return props.search
    },
    set(value: string) {
      $emit('update:search', value)
    },
  })
</script>

<style scoped lang="scss">
  .hr-sidebar {
    @apply w-full h-full bg-blue-darken rounded-[15px] p-[15px] grid;
    grid-template-rows: min-content auto 38px;
    max-height: calc(100dvh - 110px);
    max-width: min-content;

    &__header {
        @apply flex flex-col;
    }

    :deep(.p-inputtext), :deep(.base-input) {
        min-width: 0;
        width: 100%;
    }
  }
</style>

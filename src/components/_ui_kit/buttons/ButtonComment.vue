<template>
  <!-- TODO: emit открытие блока комментария. Цвет настраивается извне. Если есть комментарий -->
  <div class="button-comment">
    <ToggleButton
      :model-value="checked"
      onLabel="300"
      offLabel="300"
      aria-label="Do you confirm"
    >
      <template #icon>
        <span
          class="w-[30px] h-[30px]"
          :class="checked ? 'icon-[outlined/comment]' : 'icon-[outlined/comment]'"
        />
      </template>
    </ToggleButton>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  interface Props {
    modelValue: boolean
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:model-value', value: boolean): void
  }>()

  /* const checked = computed({
    get() {
      return props.modelValue
    },
    set(value: boolean) {
      $emit('update:model-value', value)
    },
  }) */

  const checked = ref(false)
</script>

<style lang="scss">
  .button-comment {
    .p-togglebutton .p-button {
      @apply bg-white border-none text-gray flex items-center gap-x-[10px];
      transition: all linear 0.1s;

      & * {
        transition: all linear 0.1s;
      }
    }

    .p-togglebutton:not(.p-disabled).p-highlight .p-button {
      @apply bg-white border-none text-blue;
    }

    .p-togglebutton:not(.p-disabled):has(.p-togglebutton-input:hover):not(
        .p-highlight
      )
      .p-button {
      @apply bg-white border-none text-black;
    }

    .p-togglebutton.p-highlight .p-button::before {
      box-shadow: none;
    }

    .p-button-label {
      @apply font-semibold text-base mt-1;
    }
  }
</style>

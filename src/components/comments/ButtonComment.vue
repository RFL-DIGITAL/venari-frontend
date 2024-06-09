<template>
  <!-- TODO: emit открытие блока комментария. Цвет настраивается извне. Если есть комментарий -->
  <div class="button-comment">
    <ToggleButton class="icon"
      :model-value="checked"
      onLabel="300"
      offLabel="300"
      aria-label="Do you confirm"
    >
      <template #icon>
        <span
          class="sm:w-[30px] sm:h-[30px] w-[19px] h-[19px]"
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
      @apply bg-white border-none text-gray flex items-center sm:gap-x-[10px] gap-x-[5px];
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
      @apply font-semibold sm:text-base text-xs mt-1;
    }
  }
</style>

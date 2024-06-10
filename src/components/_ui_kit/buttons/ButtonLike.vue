<template>
  <div class="button-like">
    <ToggleButton class="icon"
      v-model="checked"
      :onLabel="label"
      :offLabel="label"
      aria-label="Do you confirm"
    >
      <template #icon>
        <span
          class="sm:w-[30px] sm:h-[30px] w-[19px] h-[19px]"
          :class="checked ? 'icon-[filled/like]' : 'icon-[outlined/like]'"
        />
      </template>
    </ToggleButton>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'

  interface Props {
    modelValue: boolean
    label: string
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
  .button-like {
    .p-togglebutton .p-button {
      @apply bg-white border-none text-gray flex items-center gap-x-[10px];
      transition: all linear .1s;

      & * {
        transition: all linear .1s;
      }
    }

    .p-togglebutton:not(.p-disabled).p-highlight .p-button {
      @apply bg-white border-none text-red;
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

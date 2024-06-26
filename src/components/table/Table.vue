<template>
  <DataTable
    :selection="_selected"
    :selectionMode="selectionMode"
    :value="rows"
    :sortMode="sortMode"
    dataKey="id"
    @rowSelect="event => $emit('row-select', event.data)"
    @update:selection="val => _selected = val"
  >
    <Column v-for="(col, index) in columns" :key="index" v-bind="col"/>
  </DataTable>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'

  interface Column {
    field: string
    header: string
    sortable?: boolean
    style: string
  }

  interface Props {
    rows: any[]
    columns: Column[]
    selectionMode: 'multiple' | 'single'	
    selected: number | number[]
    sortMode: 'multiple' | 'single' | undefined
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:selected', value: any | any[]): void
    (e: 'row-select', value: any): void
  }>()

  const _selected = computed({
    get() {
      return props.selected
    },
    set(value: any | any[]) {
      console.log(value)
      $emit('update:selected', value)
    },
  })
</script>

<style scoped lang="scss">
  .p-datatable {
    @apply rounded-[15px] border-2 border-extra-light-gray;

    :deep(.p-datatable-table) {
      @apply rounded-[15px];
    }

    :deep(tr:first-child) {
      th:first-child {
        border-top-left-radius: 15px;
      }

      th:last-child {
        border-top-right-radius: 15px;
      }
    }

    :deep(tr:last-child) {
      /* background-color: black; */

      td:first-child {
        border-bottom-left-radius: 15px;
      }

      td:last-child {
        border-bottom-right-radius: 15px;
      }
    }

    :deep(tr.p-highlight > td), :deep(tr.p-highlight) {
      @apply bg-extra-light-gray border-extra-light-gray text-black;
    }
  }
</style>

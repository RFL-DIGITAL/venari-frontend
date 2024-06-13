<template>
  <Table
    :rows="_rows"
    :columns="columns"
    selectionMode="multiple"
    :selected="selected"
    @update:selected="(val) => $emit('selected', val)"
    @row-select="(data: any) => $emit('row-select', data.id)"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { HrVacancy } from '@/stores/types/schema'
  import { getFormattedDate } from '@/utils/functions/get-formatted-time'

  interface Props {
    selected: number[]
    rows: HrVacancy[]
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:selected', value: number | number[]): void
    (e: 'row-select', value: number): void
  }>()

  const _rows = computed(() => {
    return props.rows.map((row) => {
      return {
        id: row.id,
        position: row.position.name,
        accountable: `${row.accountable?.user?.lastName ?? ''} ${row.accountable?.user?.firstName?.slice(0, 1) ?? ''}`,
        city: row?.city.name,
        applicationCount: row?.applicationCount,
        candidateCount: row?.candidateCount,
        day: getFormattedDate(row?.unarchivedAt),
      }
    })
  })

  const columns = [
    {
      field: 'position',
      header: 'Вакансия',
      sortable: true,
      style: 'width: 30%',
    },
    {
      field: 'accountable',
      header: 'Ответственный',
      sortable: true,
      style: 'width: 18%',
    },
    {
      field: 'city',
      header: 'Регион поиска',
      sortable: true,
      style: 'width: 18%',
    },
    {
      field: 'applicationCount',
      header: 'Откликов',
      sortable: true,
      style: 'width: 11%',
    },
    {
      field: 'candidateCount',
      header: 'Кандидатов',
      sortable: true,
      style: 'width: 11%',
    },
    {
      field: 'day',
      header: 'Открыта',
      sortable: true,
      style: 'width: auto',
    },
  ]
</script>

<style scoped></style>

<template>
  <Table
    :rows="_rows"
    :columns="columns"
    selectionMode="multiple"
    :selected="selected"
    @update:selected="(val: any) => selectionMode ? $emit('update:selected', val as HrVacancy[]) : null"
    @row-select="(data: any) => !selectionMode ? $emit('row-select', data.id) : null"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { HrVacancy } from '@/stores/types/schema'
  import { getFormattedDate } from '@/utils/functions/get-formatted-time'

  interface Props {
    selected: HrVacancy[]
    rows: HrVacancy[]
    selectionMode: boolean
  }

  const props = defineProps<Props>()

  const $emit = defineEmits<{
    (e: 'update:selected', value: HrVacancy | HrVacancy[]): void
    (e: 'row-select', value: number): void
  }>()

  const _rows = computed(() => {
    return props.rows.map((row) => {
      return {
        id: row.id,
        position: row.position.name,
        accountable: `${row.accountable?.user?.lastName ?? ''} ${row.accountable?.user?.firstName?.slice(0, 1) ?? ''}`,
        city: row?.city?.name,
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
      style: 'width: 30%',
    },
    {
      field: 'accountable',
      header: 'Ответственный',
      style: 'width: 18%',
    },
    {
      field: 'city',
      header: 'Регион поиска',
      style: 'width: 18%',
    },
    {
      field: 'applicationCount',
      header: 'Откликов',
      style: 'width: 11%',
    },
    {
      field: 'candidateCount',
      header: 'Кандидатов',
      style: 'width: 11%',
    },
    {
      field: 'day',
      header: 'Открыта',
      /* sortable: true, */
      style: 'width: auto',
    },
  ]
</script>

<style scoped></style>

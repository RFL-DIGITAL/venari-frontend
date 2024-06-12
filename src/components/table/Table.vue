<template>
  <DataTable
    v-model:selection="selectedProduct"
    dataKey="id"
    selectionMode="multiple"
    :value="[...rows, ...rows,...rows,...rows,...rows]"
    sortable
    sortMode="multiple"
  >
    <Column v-for="(col, index) in columns" :key="index" v-bind="col" />
  </DataTable>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const selectedProduct = ref()

  const rows = [
    {
      vacancy: 'Менеджер по развитию менеджеров по развитию',
      responsive: 'Фамилия И.',
      region: 'г. Новосибирск',
      responses: 128,
      candidates: 15,
      day: '27 дней',
    },
    {
      vacancy: 'Менеджер по развитию менеджеров по развитию',
      responsive: 'Фамилия И.',
      region: 'г. Новосибирск',
      responses: 128,
      candidates: 15,
      day: '27 дней',
    },
    {
      vacancy: 'Менеджер по развитию менеджеров по развитию',
      responsive: 'Фамилия И.',
      region: 'г. Новосибирск',
      responses: 128,
      candidates: 15,
      day: '27 дней',
    },
  ]

  const columns = [
    {
      field: 'vacancy',
      header: 'Вакансия',
      sortable: true,
      style: 'width: 30%',
    },
    {
      field: 'responsive',
      header: 'Ответственный',
      sortable: true,
      style: 'width: 18%',
    },
    {
      field: 'region',
      header: 'Регион поиска',
      sortable: true,
      style: 'width: 18%',
    },
    {
      field: 'responses',
      header: 'Откликов',
      sortable: true,
      style: 'width: 11%',
    },
    {
      field: 'candidates',
      header: 'Кандидатов',
      sortable: true,
      style: 'width: 11%',
    },
    {
      field: 'day',
      header: 'Открыта',
      sortable: true,
      style: 'width: 11%',
    },
  ]
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
  }
</style>

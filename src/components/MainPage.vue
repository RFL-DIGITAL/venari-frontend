<template>
  <div class="card">
      <DataTable :value="products" tableStyle="min-width: 50rem">
          <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
      </DataTable>

      <Button label="Submit"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';


const products = ref([
  {
    code: '1',
    name: '1',
    category: '1',
    quantity: '1',
  }
]);
const columns = [
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' }
];

</script>
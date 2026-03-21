<script setup>
import { onMounted, computed, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useDataStore } from '@/stores/dataStore';

const dataStore = useDataStore();
const perpage = ref(5);
const offset = ref(0);


const properties = computed(() => { return dataStore.properties; });
const properties_total = computed(() => { return dataStore.properties_total; });

onMounted(async () => {
    await dataStore.getProperties();
    await dataStore.getPropertiesTotal();
});

function onPageChange(event) {
    offset.value = event.first;
    perpage.value = event.rows;
    dataStore.getProperties({ page: offset.value / perpage.value, perpage: perpage.value });
}

</script>



<template>
    <DataTable :value="properties" :lazy="true" :loading="dataStore.loading" :paginator="true" :rows="perpage"
        :rowsPerPageOptions="[2, 5, 10]" :totalRecords=properties_total @page="onPageChange" responsive-layout="scroll"
        :landing="true" :first="offset">

        <Column field="title" header="Название"></Column>
        <Column field="description" header="Описание"></Column>
        <Column field="is_available" header="Доступно"></Column>
        <Column field="property_type.name" header="Тип недвижимости"></Column>
        <Column field="address.street" header="Адрес"></Column>
        <Column field="address.city.name" header="Город"></Column>
        <Column field="address.city.region.name" header="Регион"></Column>
        <Column field="address.city.region.country.name" header="Страна"></Column>

    </DataTable>
</template>
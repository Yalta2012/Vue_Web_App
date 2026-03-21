<script setup>
import { useDataStore } from '@/stores/dataStore';
import { computed, ref } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const user = computed(() => { return authStore.user })
const dataStore = useDataStore();
const perpage = ref(5);
const offset = ref(0);
const properties = computed(() => { return dataStore.user_properties; });
const properties_total = computed(() => { return dataStore.user_properties_total; });

function onPageChange(event) {
    offset.value = event.first;
    perpage.value = event.rows;
    dataStore.getProperties({ user_id: user ?? user.id, page: offset.value / perpage.value, perpage: perpage.value });
}

</script>


<template>
    <div>
        <h2>My property</h2>
        <DataTable :value="properties" :lazy="true" :loading="dataStore.loading" :paginator="true" :rows="perpage"
            :rowsPerPageOptions="[2, 5, 10]" :totalRecords=properties_total @page="onPageChange"
            responsive-layout="scroll" :landing="true" :first="offset">

            <Column field="title" header="Название"></Column>
            <Column field="description" header="Описание"></Column>
            <Column field="is_available" header="Доступно"></Column>
            <Column field="property_type.name" header="Тип недвижимости"></Column>
            <Column field="address.street" header="Адрес"></Column>
            <Column field="address.city.name" header="Город"></Column>
            <Column field="address.city.region.name" header="Регион"></Column>
            <Column field="address.city.region.country.name" header="Страна"></Column>

        </DataTable>
    </div>
</template>
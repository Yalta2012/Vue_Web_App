<script setup>
import { useDataStore } from '@/stores/dataStore';
import { useAuthStore } from '@/stores/authStore';

import { computed, ref, onMounted } from 'vue';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const authStore = useAuthStore();
const dataStore = useDataStore();
const perpage = ref(5);
const offset = ref(0);
const leases = computed(() => { return dataStore.user_leases; });
const leases_total = computed(() => { return dataStore.user_leases_total; });

async function onPageChange(event) {
    offset.value = event.first;
    perpage.value = event.rows;
    await dataStore.getLeases({ user_id: authStore.user.id, page: offset.value / perpage.value, perpage: perpage.value });
    await dataStore.getLeasesTotal({ user_id: authStore.user.id });
}

onMounted(async () => {
    await dataStore.getLeases({ user_id: authStore.user.id, page: offset.value / perpage.value, perpage: perpage.value });
    await dataStore.getLeasesTotal({ user_id: authStore.user.id });
});
</script>


<template>
    <div>
        <h2>My leases</h2>
        <DataTable :value="leases" :loading="dataStore.loading" :paginator="true" :rows="perpage"
            :rowsPerPageOptions="[2, 5, 10]" :totalRecords="leases_total" @page="onPageChange"
            responsive-layout="scroll" :first="offset">
            <Column field="property.title" header="Название"></Column>
            <Column field="property.description" header="Описание"></Column>
            <Column field="start_date" header="Дата начала"></Column>
            <Column field="end_date" header="Дата окончания"></Column>
            <Column field="monthly_rent" header="Арендная плата"></Column>
            <Column field="first_installament" header="Первый взнос"></Column>
            <Column field="property.address.street" header="Улица"></Column>
            <Column field="property.address.house" header="Дом"></Column>
            <Column field="property.address.city.name" header="Город"></Column>
            <Column field="property.address.city.region.name" header="Регион"></Column>
            <Column field="property.address.city.region.country.name" header="Страна"></Column>
        </DataTable>
    </div>
</template>
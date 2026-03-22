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

        <Column header="Изображение">
            <template #body="slotProps">
                <img v-if="slotProps.data.picture_url" :src="slotProps.data.picture_url" :alt="slotProps.data.title"
                    class="property-image" @error="handleImageError" />
                <div v-else class="no-image">Нет изображения</div>
            </template>
        </Column>
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

<style scoped>
.property-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s;
}

.property-image:hover {
    transform: scale(1.1);
}

.no-image {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    color: #999;
    font-size: 12px;
    border-radius: 4px;
}
</style>
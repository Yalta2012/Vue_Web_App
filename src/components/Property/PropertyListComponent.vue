<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const properties = ref([]);

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/property');
    properties.value = response.data;
})


</script>

<template>
    <div>
        <h2>Property List</h2>
        <div v-for="property in properties">
            <h3>{{ property.title }}</h3>
            <p>{{ property.description }}</p>
            <p>Доступно: {{ property.is_available ? 'Да' : 'Нет' }}</p>
            <p>Тип: {{ property.property_type.name }}</p>
            <p>Адрес: {{ property.address.street }}, д. {{ property.address.house }}</p>
            <p>Город: {{ property.address.city.name }}</p>
            <p>Регион: {{ property.address.city.region.name }}</p>
            <p>Страна: {{ property.address.city.region.country.name }}</p>
            <hr>
        </div>
    </div>
</template>
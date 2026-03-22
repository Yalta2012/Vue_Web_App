<script setup>

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { Toast, Card, Textarea, Select, FileUpload } from 'primevue';
import { useDataStore } from '@/stores/dataStore';
import { useAuthStore } from '@/stores/authStore';
import { computed, reactive, onMounted } from 'vue';
import { data } from 'autoprefixer';
import { useToast } from 'primevue/usetoast';

const dataStore = useDataStore();
const authStore = useAuthStore();

const toast = useToast();

const errorMessage = computed(() => { return dataStore.errorMessage });
const errorCode = computed(() => { return dataStore.errorCode });


const propertyTemplate = reactive({
    title: '',
    description: '',
    address_id: null,
    country_id: null,
    region_id: null,
    city_id: null,
    type_id: null,
    image: null
});

const aboba = computed(() => {

    return propertyTemplate.image;
})


const filteredRegions = computed(() => {
    if (!propertyTemplate.country_id) return []
    return dataStore.regions.filter(r => r.country_id === propertyTemplate.country_id)
})

const filteredCities = computed(() => {
    if (!propertyTemplate.region_id) return []
    return dataStore.cities.filter(r => r.region_id === propertyTemplate.region_id)
})

const filteredAddresses = computed(() => {
    if (!propertyTemplate.city_id) return []
    return dataStore.addresses.filter(r => r.city_id === propertyTemplate.city_id)
})

function changeCaption(event) {
    console.log(event.files);
    const file = event.files[0];
    if (file) {
        propertyTemplate.image = file;
    } else {
        propertyTemplate.image = null;
    }
}

async function createProperty() {
    const formData = new FormData();
    formData.append('title', propertyTemplate.title);
    formData.append('description', propertyTemplate.description);
    console.log(authStore.user);
    formData.append('owner_id', authStore.user.id);
    formData.append('address_id', propertyTemplate.address_id);
    formData.append('type_id', propertyTemplate.type_id);
    formData.append('image', propertyTemplate.image);

    console.log(dataStore.errorCode);
    await dataStore.createProperty(formData);
    console.log(dataStore.errorCode);
    if (errorCode.value != 0)
        toast.add({ severity: 'error', summary: 'Ошибка добавления данных', detail: errorMessage, life: 5000 });
    else {

        toast.add({ severity: 'success', summary: 'Данные успешно добавлены', detail: errorMessage, life: 5000 });
        router.push('/profile/property');
    }

}

const formattedAddresses = computed(() => {
    return filteredAddresses.value.map(address => ({
        ...address,
        displayName: address.house
            ? `${address.street}, ${address.house}`
            : address.street
    }))
})

onMounted(async () => {
    await dataStore.getPropertyTypes();
    await dataStore.getLocations();
});

</script>

<template>
    <div>
        <form v-on:submit.prevent="createProperty">

            <Card>
                <template #title>
                    <h2>Создание собственности</h2>
                </template>

                <template #content>
                    <div>
                        <label>Название </label>
                        <InputText v-model="propertyTemplate.title" placeholder="Введите название" class="w-full" />
                    </div>

                    <div>
                        <label>Описание</label>
                        <Textarea v-model="propertyTemplate.description" rows="3" placeholder="Введите описание"
                            class="w-full" />
                    </div>

                    <div>
                        <label>Тип собственности</label>
                        <Select v-model="propertyTemplate.type_id" :options="dataStore.property_types"
                            optionLabel="name" optionValue="id" placeholder="Выберите тип" class="w-full" />
                    </div>

                    <div>
                        <h3>Адрес</h3>

                        <div>
                            <label>Страна</label>
                            <Select v-model="propertyTemplate.country_id" :options="dataStore.countries"
                                optionLabel="name" optionValue="id" placeholder="Выберите страну" class="w-full" />
                        </div>

                        <div>
                            <label>Регион</label>
                            <Select v-model="propertyTemplate.region_id" :options="filteredRegions" optionLabel="name"
                                optionValue="id" placeholder="Выберите регион" :disabled="!propertyTemplate.country_id"
                                class="w-full" />
                        </div>

                        <div>
                            <label>Город </label>
                            <Select v-model="propertyTemplate.city_id" :options="filteredCities" optionLabel="name"
                                optionValue="id" placeholder="Выберите город" :disabled="!propertyTemplate.region_id"
                                class="w-full" />
                        </div>

                        <div>
                            <label>Адрес </label>
                            <Select v-model="propertyTemplate.address_id" :options="formattedAddresses"
                                optionLabel="displayName" optionValue="id" placeholder="Выберите адрес"
                                :disabled="!propertyTemplate.city_id" class="w-full" />
                        </div>
                    </div>

                    <div>
                        <label>Изображение</label>
                        <FileUpload mode="basic" required accept="image/*" chooseLabel="Выбрать файл" class="w-full"
                            @select="changeCaption" />

                    </div>

                    <Button type="submit" label="Создать" />


                </template>
            </Card>
        </form>
    </div>
    <Toast position="bottom-right" />
</template>
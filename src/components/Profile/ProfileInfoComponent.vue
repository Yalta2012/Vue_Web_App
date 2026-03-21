<script setup>
import { useAuthStore } from '@/stores/authStore';

import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => { return authStore.user })

</script>


<template>
    <div>

        <h2>User info:</h2>
        <p>email: {{ user.email }}</p>
        <p>phone: {{ user.phone }}</p>
        <p>name: {{ user.first_name }} {{ user.last_name }}</p>
        <br>
    </div>
</template>
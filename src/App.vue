<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore();
onMounted(async () => {
  await authStore.getUser();
});

</script>

<template>
  <div>

    <HeaderComponent />

    <router-view />
  </div>

</template>

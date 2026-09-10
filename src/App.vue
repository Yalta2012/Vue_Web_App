<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { onMounted } from 'vue';
import { userAuthStore } from './stores/authStore';

const authStore = userAuthStore();
onMounted(async () => {
  if (userAuthStore.token) {
    await authStore.getUser();
  }
});

</script>

<template>
  <div>

    <HeaderComponent />

    <router-view />
  </div>

</template>

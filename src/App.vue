<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';

const email = ref('');
const password = ref('')
const authStore = useAuthStore()

const isAuthenticated = computed(() => { return authStore.isAuthenticated })
const user = computed(() => { return authStore.user })
const authError = computed(() => { return authStore.errorMessage })

function login() {
  authStore.login({ email: email.value, password: password.value })
}
function logout() {
  authStore.logout();
}

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    authStore.isAuthenticated = true;
    authStore.getUser();
  }
}
)
</script>

<template>
  <header>
    <nav>
      <div v-if="isAuthenticated && user">
        Welcome, {{ user.first_name }}
        <button @click="logout">Logout</button>
      </div>

      <div v-else>
        <form @submit.prevent="login">
          <div>
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required>
          </div>

          <div>
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" required>
          </div>

          <button type="submit">Login</button>
          <p v-if="authError" class="error">{{ authError }}</p>
        </form>
      </div>
    </nav>
  </header>

</template>

<style scoped>
.error {
  color: red;
}
</style>

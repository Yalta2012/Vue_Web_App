<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';


const email = ref('');
const password = ref('')
const authStore = useAuthStore()

const isAuthenticated = computed(() => { return authStore.isAuthenticated })
const user = computed(() => { return authStore.user })
const authError = computed(() => { return authStore.errorMessage })

async function login() {
    await authStore.login({ email: email.value, password: password.value });
    const token = localStorage.getItem('token');
    if (token) {
        authStore.isAuthenticated = true;
        await authStore.getUser();
    }
}
async function logout() {
    await authStore.logout();
}

onMounted(async () => {
    const token = localStorage.getItem('token');
    if (token) {
        authStore.isAuthenticated = true;
        await authStore.getUser();
    }
}
)
</script>

<template>
    <header>
        <nav>
            <ul>
                <li><router-link to="/">Главная</router-link></li>
                <li><router-link to="/profile">Профиль</router-link></li>
                <li><router-link to="/property">Список объектов</router-link></li>
            </ul>

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

header {
    border: 1px solid;
    padding: 10px;
    border-radius: 10px;
    font-size: small;
}

label {
    font-size: small;
}

button {
    font-size: small;
}

p {
    font-size: small;
}
</style>

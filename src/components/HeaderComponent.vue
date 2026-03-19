<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';


const email = ref('');
const password = ref('')
const authStore = useAuthStore()

const items = ref([
    {
        label: 'Главная страница',
        icon: 'pi pi-fw pi-home',
        route: '/',
    },

    {
        label: 'Профиль',
        icon: 'pi pi-fw pi-user',
        route: 'profile',
    },

    {
        label: 'Список объектов',
        icon: 'pi pi-fw pi-box',
        route: 'property',
    }
]);
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
    <Menubar :model="items">

        <template #start>
            <span>
                <img src="@/assets/logo.svg" width="50" alt="My SVG Icon">
            </span>
        </template>

        <template #item="{ item, props, hasSubmenu, root }">
            <a class="flex items-cenetr ml-6 p-4">
                <router-link v-if="item.route" :to="item.route">
                    <span :class="item.icon" />
                    <span class="ml-1">{{ item.label }}</span>
                </router-link>
            </a>
        </template>

        <template #end>
            <div class="flex items-center gap-2">
                <div v-if="isAuthenticated && user">
                    <span class="pi pi-fw pi-user mr-4" /> {{ user.first_name }}
                    <Button @click="logout" class="ml-4">Logout</Button>
                </div>

                <div v-else>
                    <form @submit.prevent="login">
                        <InputText v-model="email" type="email" id="email" required placeholder="Login"
                            class="m-2 sm:w-auto" :class="{ 'p-invalid': authError }" />
                        <InputText v-model="password" type="password" id="password" required placeholder="Password"
                            class="m-2 sm:w-auto" :class="{ 'p-invalid': authError }" />
                        <Button type="submit">Enter</Button>
                        <div class="ml-2"><small v-if="authError" class="error">{{ authError }}</small></div>
                    </form>
                </div>
            </div>


        </template>
    </Menubar>

</template>

<style scoped>
.error {
    color: red;
}

header {
    border: 1px solid;
    /* padding: 10px; */
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

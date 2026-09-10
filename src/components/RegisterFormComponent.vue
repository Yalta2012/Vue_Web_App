<script setup>
import { Button, InputText, Password } from 'primevue';
import { userAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import router from '@/router';

const firstName = ref('');
const lastName = ref('');
const password = ref('');
const password2 = ref('');
const email = ref('');

const authStore = userAuthStore();

// Одна "плоская" мапа ошибок: { email: 'текст', password: 'текст' }
const errors = ref({});

function validate() {
    const e = {};

    if (!firstName.value.trim()) e.first_name = 'Имя обязательно';
    if (!lastName.value.trim()) e.last_name = 'Фамилия обязательна';

    if (!email.value.trim()) {
        e.email = 'Email обязателен';
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        e.email = 'Некорректный email';
    }

    if (!password.value) {
        e.password = 'Пароль обязателен';
    } else if (password.value.length < 8) {
        e.password = 'Минимум 8 символов';
    }

    if (password.value !== password2.value) {
        e.password2 = 'Пароли не совпадают';
    }

    errors.value = e;
    return Object.keys(e).length === 0;
}

async function register() {
    if (!validate()) return;

    errors.value = {};

    try {
        await authStore.register({
            first_name: firstName.value,
            last_name: lastName.value,
            password: password.value,
            email: email.value,
        });

        const token = localStorage.getItem('token');
        if (token) {
            authStore.isAuthenticated = true;
            await authStore.getUser();
        }

        router.replace('/');

    } catch (err) {

        const serverErrors = err?.response?.data?.errors || {};
        const mapped = {};
        for (const key in serverErrors) {
            mapped[key] = Array.isArray(serverErrors[key])
                ? serverErrors[key][0]
                : serverErrors[key];
        }
        errors.value = mapped;
    }
}
</script>

<template>
    <div class="flex justify-center p-10">
        <form @submit.prevent="register" class="flex flex-col gap-3 w-80">
            <InputText v-model="email" type="email" placeholder="Email" :invalid="!!errors.email" />
            <!-- <small v-if="errors.email" class="p-error">{{ errors.email }}</small> -->

            <InputText v-model="firstName" placeholder="Имя" :invalid="!!errors.first_name" />
            <!-- <small v-if="errors.first_name" class="p-error">{{ errors.first_name }}</small> -->

            <InputText v-model="lastName" placeholder="Фамилия" :invalid="!!errors.last_name" />
            <!-- <small v-if="errors.last_name" class="p-error">{{ errors.last_name }}</small> -->

            <Password v-model="password" placeholder="Пароль" toggleMask :feedback="true"
                :invalid="!!errors.password" />
            <!-- <small v-if="errors.password" class="p-error">{{ errors.password }}</small> -->

            <Password v-model="password2" placeholder="Повторите пароль" :feedback="false" toggleMask
                :invalid="!!errors.password2" />
            <!-- <small v-if="errors.password2" class="p-error">{{ errors.password2 }}</small> -->

            <Button type="submit" label="Зарегистрироваться" />

            <div v-if="Object.keys(errors).length" class="p-error text-sm">
                <p>Пожалуйста, исправьте следующие ошибки:</p>
                <ul class="list-disc pl-5">
                    <li v-for="(msg, field) in errors" :key="field">{{ msg }}</li>
                </ul>
            </div>
        </form>
    </div>
</template>
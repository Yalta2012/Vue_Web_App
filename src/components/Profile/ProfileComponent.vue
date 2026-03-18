    <script setup>
    import { computed, onMounted } from 'vue';
    import { useAuthStore } from '@/stores/authStore';


    const authStore = useAuthStore()

    const isAuthenticated = computed(() => { return authStore.isAuthenticated })
    const user = computed(() => { return authStore.user })


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
        <div>
            <div v-if="isAuthenticated && user">
                <h2>User info:</h2>
                <p>email: {{ user.email }}</p>
                <p>phone: {{ user.phone }}</p>
                <p>name: {{ user.first_name }} {{ user.last_name }}</p>
            </div>

            <div v-else>
                <p>Please log in</p>
            </div>

        </div>
    </template>

<style scoped>
.error {
    color: red;
}
</style>

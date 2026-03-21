    <script setup>
    import { computed, onMounted } from 'vue';
    import { useAuthStore } from '@/stores/authStore';
    import { useDataStore } from '@/stores/dataStore';


    const authStore = useAuthStore();
    const dataStore = useDataStore();

    const isAuthenticated = computed(() => { return authStore.isAuthenticated })
    const user = computed(() => { return authStore.user })

    onMounted(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            authStore.isAuthenticated = true;
            await authStore.getUser();
            await dataStore.getProperties({ user_id: authStore.user.id });
            await dataStore.getLeases({ tenant_id: authStore.user.id });
        }
    }
    )
</script>

    <template>
        <div>
            <div v-if="isAuthenticated && user">

                <div>
                    <router-link to="/profile/">Profile info</router-link>
                    <router-link to="/profile/property">My property</router-link>
                    <router-link to="/profile/leases">My leases</router-link>
                </div>
                <router-view />


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

.ssss {
    border: 1px solid red;
}
</style>

import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/components/HomePage.vue'
import PropertyListComponent from '@/components/Property/PropertyListComponent.vue'
import ProfileComponent from '@/components/Profile/ProfileComponent.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },

    {
        path: '/property',
        name: 'PropertyList',
        component: PropertyListComponent
    },

    {
        path: '/profile',
        name: 'Profile',
        component: ProfileComponent
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
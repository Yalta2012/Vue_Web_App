import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/components/HomePage.vue'
import PropertyListComponent from '@/components/Property/PropertyListComponent.vue'
import ProfileComponent from '@/components/Profile/ProfileComponent.vue'
import ProfileInfoComponent from '@/components/Profile/ProfileInfoComponent.vue'
import ProfileLeasesComponent from '@/components/Profile/ProfileLeasesComponent.vue'
import ProfilePropertyComponent from '@/components/Profile/ProfilePropertyComponent.vue'

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },

    {
        path: '/property',
        name: 'PropertyList',
        component: PropertyListComponent,
    },

    {
        path: '/profile',
        name: 'Profile',
        component: ProfileComponent,
        children: [
            {
                path: '',
                name: 'ProfileInfo',
                component: ProfileInfoComponent,
            },
            {
                path: 'leases',
                name: 'ProfileLeases',
                component: ProfileLeasesComponent
            },
            {
                path: 'property',
                name: 'ProfileProperties',
                component: ProfilePropertyComponent
            }
        ]
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
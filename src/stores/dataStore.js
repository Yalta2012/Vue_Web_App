import { defineStore } from "pinia";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data',
    {
        state: () => ({
            properties: [],
            properties_total: null,
            user_properties: [],
            user_properties_total: null,
            user_leases: [],
            user_leases_total: null,
            errorMessage: "",
            loading: false,
        }),

        actions: {
            async getProperties(filters = {}) {
                this.errorMessage = "";
                this.loading = true;
                try {
                    const params = {
                        page: filters.page ?? 0,
                        perpage: filters.perpage ?? 5,
                        user_id: filters.user_id ?? null
                    };

                    const response = await axios.get(backendUrl + 'property', {
                        params
                    });

                    if (filters.user_id) {
                        this.user_properties = response.data;
                    }
                    else {
                        this.properties = response.data;
                    }
                }
                catch (error) {
                    if (error.response) {
                        this.errorMessage = error.response.data.message;
                        console.log(error);
                    }
                    else if (error.request) {
                        this.errorMessage = error.message;
                        console.log(error);
                    }
                    else {
                        console.log(error);
                    }
                }
                finally {
                    this.loading = false;
                }
            },

            async getPropertiesTotal(filters = {}) {
                this.errorMessage = "";
                this.loading = true;

                try {
                    const params = {
                        user_id: filters.user_id ?? null
                    };

                    const response = await axios.get(backendUrl + 'property_total', { params });
                    if (filters.user_id) {
                        this.user_properties_total = response.data;
                    }
                    else {
                        this.properties_total = response.data;
                    }
                }
                catch (error) {
                    if (error.response) {
                        this.errorMessage = error.response.data.message;
                        console.log(error);
                    }
                    else if (error.request) {
                        this.errorMessage = error.message;
                        console.log(error);
                    }
                    else {
                        console.log(error);
                    }
                }
                finally {
                    this.loading = false;
                }
            },

            async getLeases(filters = {}) {
                this.errorMessage = "";
                this.loading = true;
                try {
                    const params = {
                        page: filters.page ?? 0,
                        perpage: filters.perpage ?? 5,
                        property_id: filters.property_id ?? null,
                        tenant_id: filters.tenant_id ?? null

                    };

                    const response = await axios.get(backendUrl + 'leases', {
                        params
                    });

                    this.user_leases = response.data;

                }
                catch (error) {
                    if (error.response) {
                        this.errorMessage = error.response.data.message;
                        console.log(error);
                    }
                    else if (error.request) {
                        this.errorMessage = error.message;
                        console.log(error);
                    }
                    else {
                        console.log(error);
                    }
                }
                finally {
                    this.loading = false;
                }
            },

            async getLeasesTotal(filters = {}) {
                this.errorMessage = "";
                this.loading = true;

                try {
                    const params = {
                        property_id: filters.property_id ?? null,
                        tenant_id: filters.tenant_id ?? null
                    };

                    const response = await axios.get(backendUrl + 'leases_total', { params });
                    this.leases_total = response.data;
                }
                catch (error) {
                    if (error.response) {
                        this.errorMessage = error.response.data.message;
                        console.log(error);
                    }
                    else if (error.request) {
                        this.errorMessage = error.message;
                        console.log(error);
                    }
                    else {
                        console.log(error);
                    }
                }
                finally {
                    this.loading = false;
                }
            },
        }
    }
)
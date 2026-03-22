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
            property_types: [],
            addresses: [],
            cities: [],
            regions: [],
            countries: [],

            errorMessage: "",
            errorCode: "",
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

                    console.log('AAA');
                    console.log(response.data);
                    console.log(filters);
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

            async getPropertyTypes() {
                this.errorMessage = "";
                this.loading = true;
                try {

                    const response = await axios.get(backendUrl + 'property_type');
                    this.property_types = response.data;
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

            async getLocations() {
                this.errorMessage = "";
                this.loading = true;
                try {
                    let response = null;
                    response = await axios.get(backendUrl + 'address');
                    this.addresses = response.data;

                    response = await axios.get(backendUrl + 'city');
                    this.cities = response.data;

                    response = await axios.get(backendUrl + 'region');
                    this.regions = response.data;

                    response = await axios.get(backendUrl + 'country');
                    this.countries = response.data;
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

            async createProperty(formData) {
                this.errorMessage = "";
                this.loading = true;

                try {
                    const response = await axios.post(backendUrl + 'property', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        },
                    });
                    this.errorCode = response.data.code;
                    this.errorMessage = response.data.message;
                }
                catch (error) {
                    if (error.response) {
                        this.errorCode = 11;
                        this.errorMessage = error.response.data.message;
                        console.log(error);
                    }
                    else if (error.request) {
                        this.errorCode = 12;
                        this.errorMessage = error.message;
                        console.log(error);
                    }
                    else {
                        this.errorCode = 13;
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
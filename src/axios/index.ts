import { BASE_URL } from '@constants/api';
import axios from 'axios';

export interface AuthResponse {
    accessToken: string;
}

const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL
});


$api.interceptors.request.use((config) => {
    if (localStorage.getItem('cleverfit-token')) {
        config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('cleverfit-token')).accessToken}`;
    }
    if (sessionStorage.getItem('cleverfit-token')) {
        config.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('cleverfit-token')).accessToken}`;
    }
    return config;
});

export default $api;

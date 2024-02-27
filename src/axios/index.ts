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
    config.headers.Authorization = `Bearer ${localStorage.getItem('cleverfit-token')}`;
    return config;
});

export default $api;

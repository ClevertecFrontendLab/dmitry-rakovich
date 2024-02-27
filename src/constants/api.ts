export const BASE_URL = 'https://marathon-api.clevertec.ru'

export const api = {
    auth: {
        google: `${BASE_URL}/auth/google`,
        login: `${BASE_URL}/auth/login`,
        registration: `${BASE_URL}/auth/registration`,
        check_email: `${BASE_URL}/auth/check-email`,
        confirm_email: `${BASE_URL}/auth/confirm-email`,
        change_password: `${BASE_URL}/auth/change-password`,
    },
}
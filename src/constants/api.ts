export const BASE_URL = 'https://marathon-api.clevertec.ru'

const URLs = {
    auth_google: '/auth/google',
    auth_login: '/auth/login',
    auth_registration: '/auth/registration',
    auth_check_email: '/auth/check-email',
    auth_confirm_email: '/auth/confirm-email',
    auth_change_password: '/auth/change-password',
}

export const api = {
    auth: {
        google: `${BASE_URL}/${URLs.auth_google}`,
        login: `${BASE_URL}/${URLs.auth_login}`,
        registration: `${BASE_URL}/${URLs.auth_registration}`,
        check_email: `${BASE_URL}/${URLs.auth_check_email}`,
        confirm_email: `${BASE_URL}/${URLs.auth_confirm_email}`,
        change_password: `${BASE_URL}/${URLs.auth_change_password}`,
    },
}
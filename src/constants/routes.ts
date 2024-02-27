export const ROUTES = {
    main: '/main',
    auth: {
        main: '/auth',
        login: '/auth/login',
        registration: '/auth/registration',
        check_email: '/auth/check-email',
        confirm_email: '/auth/confirm-email',
        change_password: '/auth/change-password',
    },
    result: {
        success: '/result/success',
        success_change_password: '/result/success-change-password',
        error: {
            user_exist: '/result/error-user-exist',
            login: '/result/error-login',
            check_email_no_exist: '/result/error-check-email-no-exist',
            check_email: '/result/error-check-email',
            change_password: '/result/error-change-password',
            other: '/result/error',
        }
    }
}
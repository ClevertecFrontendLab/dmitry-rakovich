export const result = {
    error_other: {
        iconClassName: 'warning',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        buttonText: 'Повторить',
    },
    error_user_exist: {
        iconClassName: 'warning',
        title: 'Данные не сохранились',
        text: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        buttonText: 'Назад к регистрации',
    },
    error_login: {
        iconClassName: 'error_login',
        title: 'Вход не выполнен',
        text: 'Что-то пошло не так. Попробуйте ещё раз.',
        buttonText: 'Повторить',
    },
    error_check_email_no_exist: {
        iconClassName: 'warning',
        title: 'Такой e-mail не зарегистрирован',
        text: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другого e-mail.',
        buttonText: 'Попробовать снова',
    },
    error_check_email: {
        iconClassName: 'error_check_email',
        title: 'Что-то пошло не так',
        text: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        buttonText: 'Назад',
    },
    error_change_password: {
        iconClassName: 'warning',
        title: 'Данные не сохранились',
        text: 'Что-то пошло не так. Попробуйте ещё раз.',
        buttonText: 'Повторить',
    },
    success: {
        iconClassName: 'register_success',
        title: 'Регистрация успешна',
        text: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        buttonText: 'Войти',
    },
    success_change_password: {
        iconClassName: 'register_success',
        title: 'Пароль успешно изменён',
        text: 'Теперь можно войти в аккаунт, используя свой логин и пароль',
        buttonText: 'Вход',
    },
    confirm_email: {
        error: {
            iconClassName: 'warning',
            title: 'Неверный код. Введите код для восстановления аккауанта',
            text: 'Мы отправили вам на шестизначный код. Введите его в поле ниже',
        },

        iconClassName: 'confirm_email',
        title: 'Введите код для восстановления аккаунта',
        text: 'Мы отправили вам на шестизначный код. Введите его в поле ниже',
        buttonText: '',
    }

}
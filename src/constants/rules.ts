import { regex } from "./regex";

export const rules = {
    email: {
        pattern: regex.email,
        message: 'Email должен быть вида name@example.com'
    },
    password: {
        pattern: regex.password,
        message: 'Пароль должен содержать как минимум 1 цифру, 1 латинскую строчную и одну заглавную букву.ы'
    },
}
import { GooglePlusOutlined } from "@ant-design/icons"
import { regex } from "@constants/regex"
import { rules } from "@constants/rules"
import { Button, Checkbox, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/logo.svg'
import styles from './styles.module.scss'
import { AuthWrapper } from "@components/AuthWrapper"
import { routes } from "@constants/api"
import { ROUTES } from "@constants/routes"
import { push } from "redux-first-history"
import $api from "../../axios"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { setData, signIn } from "@redux/slices/user-slice"
import { Loader } from "@components/Loader/Loader"

export const AuthPage: React.FC = () => {
    const { pathname } = useLocation();
    const [disabled, setDisabled] = useState<boolean>(true)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.user)
    const authData = useAppSelector(state => state.user.authData)


    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (authData.pathname === "error_check_email") {
            resetPassword()
        }
    }, [user])

    const validateForm = () => {
        const { email, password } = form.getFieldsValue(['email', 'password'])
        if (email.match(regex.email)) {
            setDisabled(false);
        } else setDisabled(true);
        if (email.match(regex.email) && password.match(regex.password)) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }

    const sendForm = async () => {
        const { remember } = form.getFieldsValue(['remember'])

        if (isFormValid) {
            setIsLoading(true)
            try {
                const response = await $api.post(routes.auth.login, {
                    email: form.getFieldValue('email'),
                    password: form.getFieldValue('password')
                })
                if (response.status === 200) {
                    dispatch(signIn({ user: true }))
                    if (remember) {
                        localStorage.setItem('cleverfit-token', JSON.stringify(response.data.accessToken))
                    }
                    dispatch(push(ROUTES.main));
                }
            } catch (error) {
                dispatch(setData({
                    pathname: 'auth'
                }))
                dispatch(push(ROUTES.result.error.login));
            }
            setIsLoading(false)
        } else {
            form.validateFields()
        }
    };

    const resetPassword = async () => {
        setIsLoading(true)
        try {
            const response = await $api.post(routes.auth.check_email, {
                email: authData.email || form.getFieldValue('email')
            })
            if (response.status === 200) {
                dispatch(setData({ email: form.getFieldValue('email'), pathname: 'check-email' }))
                dispatch(push(ROUTES.auth.confirm_email))
                return
            }
        } catch (error) {
            if (error.response.data.statusCode === 404 && error.response.data.message === 'Email не найден') {
                dispatch(setData({ pathname: 'check-email' }))
                dispatch(push(ROUTES.result.error.check_email_no_exist));
                return
            }
            dispatch(setData({
                pathname: 'error_check_email',
                email: form.getFieldValue('email')
            }))
            dispatch(push(ROUTES.result.error.check_email));
        }
        setIsLoading(false)
    }

    return (
        <AuthWrapper>
            {isLoading && <Loader />}
            <Form
                form={form}
                layout="vertical"
                className={styles.form}
                onValuesChange={validateForm}
                initialValues={{ email: '', password: '', remember: false }}
            >
                <div className={`${styles.logo} logo`}>
                    <img src={logo} alt="" />
                </div>
                <div className={styles.links}>
                    <Link to={'/'} className={pathname === '/auth' ? styles.active : ''}>Вход</Link>
                    <Link to={'/auth/registration'}>Регистрация</Link>
                </div>
                <div className={styles.input_block}>
                    <Form.Item
                        name="email"
                        rules={[rules.email]}
                        className={styles.form_item}
                    >
                        <Input
                            data-test-id='login-email'
                            addonBefore="e-mail:"
                            size="large"
                            className={styles.input}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        className={styles.form_item}
                        rules={[rules.password]}
                        help="Пароль должен содержать как минимум 1 цифру, 1 латинскую строчную и одну заглавную букву."
                    >
                        <Input.Password
                            data-test-id='login-password'
                            placeholder='Пароль'
                            size="large"
                            className={styles.input}
                        />
                    </Form.Item>
                </div>
                <div className={styles.row}>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        className={styles.form_item}
                    >
                        <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button
                        type="link"
                        className={styles.link}
                        disabled={disabled}
                        onClick={resetPassword}
                        data-test-id='login-forgot-button'
                    >
                        Забыли пароль?
                    </Button>
                </div>
                <div className={styles.buttons}>
                    <Form.Item
                        className={styles.form_item}>
                        <Button
                            type="primary"
                            className={`${styles.button} ${styles.signin}`}
                            size="large"
                            onClick={sendForm}
                            data-test-id='login-submit-button'
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item
                        className={styles.form_item}>
                        <Button
                            size="large"
                            className={styles.button}
                        >
                            <GooglePlusOutlined />
                            <span>Войти через Google</span>
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </AuthWrapper>
    )
}
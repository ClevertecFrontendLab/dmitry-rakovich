import { GooglePlusOutlined } from "@ant-design/icons"
import { regex } from "@constants/regex"
import { rules } from "@constants/rules"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/logo.svg'
import styles from '../auth.module.scss'
import { api } from "@constants/api"
import $api from "../../axios"
import { push } from "redux-first-history";
import { ROUTES } from "@constants/routes"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { AuthWrapper } from "@components/AuthWrapper"
import { Loader } from "@components/Loader/Loader"
import { setData } from "@redux/slices/user-slice"

export const RegisterPage: React.FC = () => {
    const { pathname } = useLocation();
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.user)
    const authData = useAppSelector(state => state.user.authData)

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.result.error.other)
                register()
        }

    }, [user])

    const validateForm = () => {
        const { email, password, confirmPassword } = form.getFieldsValue(['email', 'password', 'confirmPassword'])
        if (email.match(regex.email) && password.match(regex.password) && password === confirmPassword) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }

    const register = async () => {
        setIsLoading(true)
        try {
            const response = await $api.post(api.auth.registration, {
                email: authData.email || form.getFieldValue('email'),
                password: authData.password || form.getFieldValue('password')
            })
            if (response.status === 201) {
                dispatch(push(ROUTES.result.success, {
                    from: ROUTES.auth.registration
                }));
            }
        } catch (error) {
            if (error.response.status === 409) {
                dispatch(push(ROUTES.result.error.user_exist, {
                    from: ROUTES.auth.registration
                }));
                return
            }
            dispatch(setData({
                email: authData.email || form.getFieldValue('email'),
                password: authData.password || form.getFieldValue('password')
            }))
            dispatch(push(ROUTES.result.error.other, {
                from: ROUTES.auth.registration
            }))
        }
        setIsLoading(false)
    }

    const sendForm = async () => {
        if (isFormValid) {
            register()
        } else {
            form.validateFields()
        }
    };

    return (
        <AuthWrapper>
            {isLoading && <Loader />}
            <Form
                form={form}
                layout="vertical"
                className={styles.form}
                onValuesChange={validateForm}
                initialValues={{ email: '', password: '' }}
            >
                <div className={`${styles.logo} logo`}>
                    <img src={logo} alt="" />
                </div>
                <div className={styles.links}>
                    <Link to={'/auth'} >Вход</Link>
                    <Link
                        to={'/auth/registration'}
                        className={pathname === '/auth/registration' ? styles.active : ''}
                    >
                        Регистрация
                    </Link>
                </div>
                <div className={styles.input_block}>
                    <Form.Item
                        name="email"
                        rules={[rules.email]}
                        className={styles.form_item}
                    >
                        <Input
                            data-test-id='registration-email'
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
                            data-test-id='registration-password'
                            placeholder='Пароль'
                            size="large"
                            className={styles.input}
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        className={styles.form_item}
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Подтвердите пароль!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Подтверждение пароля не совпадает'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            data-test-id='registration-confirm-password'
                            placeholder='Повторите пароль'
                            size="large"
                            className={styles.input}
                        />
                    </Form.Item>
                </div>
                <div className={styles.buttons}>
                    <Form.Item
                        className={styles.form_item}>
                        <Button
                            type="primary"
                            className={`${styles.button} ${styles.signin}`}
                            size="large"
                            data-test-id='registration-submit-button'
                            onClick={sendForm}
                            disabled={!isFormValid}
                        >
                            Регистрация
                        </Button>
                    </Form.Item>
                    <Form.Item
                        className={styles.form_item}>
                        <Button
                            size="large"
                            className={styles.button}
                        >
                            <GooglePlusOutlined />
                            <span>Регистрация через Google</span>
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </AuthWrapper>
    )
}
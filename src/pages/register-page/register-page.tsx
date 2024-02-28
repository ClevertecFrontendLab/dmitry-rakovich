import { GooglePlusOutlined } from "@ant-design/icons"
import { regex } from "@constants/regex"
import { rules } from "@constants/rules"
import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/logo.svg'
import styles from '../auth.module.scss'
import { push } from "redux-first-history";
import { ROUTES } from "@constants/routes"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { AuthWrapper } from "@components/AuthWrapper"
import { Loader } from "@components/Loader/Loader"
import { userSelector } from "@redux/selectors"
import { register } from "@redux/actions/user-actions"

export const RegisterPage: React.FC = () => {
    const { pathname } = useLocation();
    const [isFormValid, setIsFormValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.result.error.other)
                registerUser()
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

    const registerUser = async () => {
        const { email, password } = form.getFieldsValue(['email', 'password'])
        setIsLoading(true)
        dispatch(register({ email, password }))
        setIsLoading(false)
    }

    const sendForm = async () => {
        if (isFormValid) {
            registerUser()
        } else {
            form.validateFields()
        }
    };

    return (
        <AuthWrapper>
            <Loader className={isLoading ? 'visible' : ''} />
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
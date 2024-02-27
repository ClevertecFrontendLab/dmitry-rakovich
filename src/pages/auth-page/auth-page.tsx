import { GooglePlusOutlined } from "@ant-design/icons"
import { regex } from "@constants/regex"
import { rules } from "@constants/rules"
import { Button, Checkbox, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from '../../assets/logo.svg'
import styles from '../auth.module.scss'
import { AuthWrapper } from "@components/AuthWrapper"
import { ROUTES } from "@constants/routes"
import { push } from "redux-first-history"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { Loader } from "@components/Loader/Loader"
import { userSelector } from "@redux/selectors"
import { login, restorePassword } from "@redux/actions/user-actions"

export const AuthPage: React.FC = () => {
    const { pathname } = useLocation();
    const [disabled, setDisabled] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))

        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.result.error.check_email) {
                sendPassword()
            }
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
        const { email, password, remember } = form.getFieldsValue(['email', 'password', 'remember'])

        if (isFormValid) {
            setIsLoading(true)
            dispatch(login({ email, password, remember }))
            setIsLoading(false)
        } else {
            form.validateFields()
        }
    };

    const sendPassword = async () => {
        const email = form.getFieldValue('email')
        setIsLoading(true)
        dispatch(restorePassword(email))
        setIsLoading(false)
    }

    const resetPassword = async () => {
        const email = form.getFieldValue('email')
        if (!email.match(regex.email)) {
            setDisabled(disabled)
            return
        } else {
            sendPassword()
        }
    }

    return (
        <AuthWrapper>
            <Loader className={isLoading ? 'visible' : ''} />
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
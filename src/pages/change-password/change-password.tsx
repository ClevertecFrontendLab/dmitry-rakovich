import { Button, Form, Input } from "antd";
import styles from './styles.module.scss';
import { rules } from "@constants/rules";
import { regex } from "@constants/regex";
import { useEffect, useState } from "react";
import { AuthWrapper } from "@components/AuthWrapper";
import $api from "../../axios";
import { ROUTES } from "@constants/routes";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { push } from "redux-first-history";
import { setData } from "@redux/slices/user-slice";
import { Loader } from "@components/Loader/Loader";


export const ChangePassword: React.FC = () => {
    const [isFormValid, setIsFormValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.user)
    const authData = useAppSelector(state => state.user.authData)

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.auth.confirm_email) {
                return
            }
            if (history.state.usr.from === ROUTES.result.error.change_password) {
                sendPassword()
            }
        }
        dispatch(push(ROUTES.auth.main))

    }, [user])

    const validateForm = () => {
        const { password, confirmPassword } = form.getFieldsValue(['password', 'confirmPassword'])
        if (password.match(regex.password) && password === confirmPassword) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }

    const sendPassword = async () => {
        setIsLoading(true)
        try {
            const response = await $api.post(ROUTES.auth.change_password, {
                password: authData.password || form.getFieldValue('password'),
                confirmPassword: authData.confirmPassword || form.getFieldValue('confirmPassword')
            })
            if (response.status === 201) {
                dispatch(push(ROUTES.result.success_change_password, {
                    from: ROUTES.auth.change_password
                }))
            }
        } catch (error) {
            dispatch(setData({
                password: authData.password || form.getFieldValue('password'),
                confirmPassword: authData.confirmPassword || form.getFieldValue('confirmPassword')
            }))
            dispatch(push(ROUTES.result.error.change_password, {
                from: ROUTES.auth.change_password
            }))
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
                initialValues={{ email: '', password: '' }}
            >
                <h1>Восстановление аккаунта</h1>
                <div className={styles.input_block}>


                    <Form.Item
                        name="password"
                        className={styles.form_item}
                        rules={[rules.password]}
                        help="Пароль должен содержать как минимум 1 цифру, 1 латинскую строчную и одну заглавную букву."
                    >
                        <Input.Password
                            data-test-id='change-password'
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
                            data-test-id='change-confirm-password'
                            placeholder='Повторите пароль'
                            size="large"
                            className={styles.input}
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    className={styles.form_item}>
                    <Button
                        type="primary"
                        className={`${styles.button} ${styles.save}`}
                        size="large"
                        onClick={sendPassword}
                        data-test-id='change-submit-button'
                        disabled={!isFormValid}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </AuthWrapper>
    )
}

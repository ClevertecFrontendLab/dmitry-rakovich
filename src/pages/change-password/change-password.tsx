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
    const { previousLocations } = useAppSelector(state => state.router)
    const { pathname } = useAppSelector(state => state.user.authData)

    useEffect(() => {

        console.log(previousLocations);

        if (user) dispatch(push(ROUTES.main))
        if (pathname !== 'success_confirm_email') {
            dispatch(push(ROUTES.auth.main))
        }
    }, [user, authData])

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
            if (response.status === 200) {
                dispatch(setData({ pathname: 'success_change_password' }))
                dispatch(push(ROUTES.result.success_change_password))
            }
        } catch (error) {
            dispatch(setData({ pathname: 'error-change-password' }))
            dispatch(push(ROUTES.result.error.change_password))
        }
        setIsLoading(false)
    }

    const sendNewPassword = async () => {
        if (isFormValid) {
            sendPassword()
        }
        else {
            form.validateFields()
        }
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
                        help="Пароль не менее 8 символов, с заглавной буквой и цифрой"
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
                        onClick={sendNewPassword}
                        data-test-id='change-submit-button'
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </AuthWrapper>
    )
}

import { Button, Form, Input } from "antd";
import styles from './styles.module.scss';
import { rules } from "@constants/rules";
import { useEffect, useState } from "react";
import { AuthWrapper } from "@components/AuthWrapper";
import { ROUTES } from "@constants/routes";
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { push } from "redux-first-history";
import { Loader } from "@components/Loader/Loader";
import { userSelector } from "@redux/selectors";
import { changePassword } from "@redux/actions/user-actions";


export const ChangePassword: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)

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

    const sendPassword = async () => {
        const { password, confirmPassword } = form.getFieldsValue(['password', 'confirmPassword'])
        setIsLoading(true)
        dispatch(changePassword({ password, confirmPassword }))
        setIsLoading(false)
    }

    return (
        <AuthWrapper>
            <Loader className={isLoading ? 'visible' : ''} />
            <Form
                form={form}
                layout="vertical"
                className={styles.form}
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
                            placeholder='Новый пароль'
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
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </AuthWrapper>
    )
}

import { result } from "@constants/resultPageData"
import { CloseCircleFilled, ExclamationCircleFilled } from "@ant-design/icons"
import { AuthWrapper } from "@components/AuthWrapper"
import styles from '../styles.module.scss'
import '../icons.scss'
import './styles.scss'
import VerificationInput from "react-verification-input"
import $api from "../../../axios"
import { ROUTES } from "@constants/routes"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { push } from "redux-first-history"
import { setData } from "@redux/slices/user-slice"
import { Loader } from "@components/Loader/Loader"

export const ConfirmEmail: React.FC = () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { email, pathname } = useAppSelector(state => state.user.authData)
    const user = useAppSelector(state => state.user.user)

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (pathname === 'check-email') {
            return
        } else dispatch(push(ROUTES.auth.main));
        // return () => {
        //     dispatch(setData({}))
        // }
    }, [user, pathname])

    const confirmEmail = async (code: string) => {
        setIsLoading(true)
        try {
            const response = await $api.post(ROUTES.auth.confirm_email, {
                email,
                code
            })
            if (response.status === 200) {
                dispatch(setData({ pathname: "success_confirm_email" }))
                dispatch(push(ROUTES.auth.change_password))
            }
        } catch (error) {
            setValue('')
            setError(true)
        }
        setIsLoading(false)
    }
    return (
        <AuthWrapper>
            {isLoading && <Loader />}
            <div className={styles.form}>
                {
                    !error
                        ? <ExclamationCircleFilled className={`icon ${result.confirm_email.iconClassName}`} />
                        : <CloseCircleFilled className={`icon ${result.confirm_email.error.iconClassName}`} />
                }
                <div>
                    <h1 className={styles.title}>
                        {
                            !error
                                ? result.confirm_email.title
                                : result.confirm_email.error.title
                        }
                    </h1>
                    <p className={styles.text}>
                        {`Мы отправили вам на ${email && email} шестизначный код. Введите его в поле ниже.`}
                    </p>
                </div>
                <VerificationInput
                    data-test-id='verification-input'
                    value={value}
                    onChange={(value) => setValue(value)}
                    onComplete={(value) => confirmEmail(value)}
                    validChars="0-9"
                    inputProps={{ inputMode: "numeric" }}
                    classNames={{
                        container: "container",
                        character: `character ${error ? 'error' : ''}`,
                        characterInactive: "character--inactive",
                        characterSelected: "character--selected",
                        characterFilled: "character--filled",
                    }}
                />
                <p>Не пришло письмо? Проверьте папку Спам.</p>
            </div>
        </AuthWrapper>
    )
}
import { result } from "@constants/resultPageData"
import { CloseCircleFilled, ExclamationCircleFilled } from "@ant-design/icons"
import { AuthWrapper } from "@components/AuthWrapper"
import styles from '../styles.module.scss'
import '../icons.scss'
import './styles.scss'
import VerificationInput from "react-verification-input"
import { ROUTES } from "@constants/routes"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { push } from "redux-first-history"
import { Loader } from "@components/Loader/Loader"
import { authDataSelector, userSelector } from "@redux/selectors"
import { verifyEmail } from "@redux/actions/user-actions"

export const ConfirmEmail: React.FC = () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { email } = useAppSelector(authDataSelector)
    const user = useAppSelector(userSelector)

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.auth.main) {
                return
            }
        }
        dispatch(push(ROUTES.auth.main));
    }, [user])

    const confirmEmail = async (code: string) => {
        setIsLoading(true)
        dispatch(verifyEmail({
            code, setError, setValue
        }))
        setIsLoading(false)
    }
    return (
        <AuthWrapper>
            <Loader className={isLoading ? 'visible' : ''} />
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
                    value={value}
                    onChange={(value) => setValue(value)}
                    onComplete={(value) => confirmEmail(value)}
                    validChars="0-9"
                    inputProps={{ inputMode: "numeric", 'data-test-id': 'verification-input' }}
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

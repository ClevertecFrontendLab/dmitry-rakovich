import { result } from "@constants/resultPageData"
import { ROUTES } from "@constants/routes"
import { ErrorCheckEmailIcon } from "../../../assets/icons/ErrorCheckEmailIcon"
import { useAppSelector, useAppDispatch } from "@hooks/typed-react-redux-hooks"
import { useEffect } from "react"
import { push } from "redux-first-history"
import styles from '../styles.module.scss'
import '../icons.scss'
import { AuthWrapper } from "@components/AuthWrapper"
import { Button } from "antd"
import { userSelector } from "@redux/selectors"

export const ErrorCheckEmail: React.FC = () => {
    const user = useAppSelector(userSelector)

    const dispatch = useAppDispatch()
    const navigateTo = () => {
        dispatch(push(ROUTES.auth.main, {
            from: ROUTES.result.error.check_email
        }))
    }

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.auth.main) {
                return
            }
        }
        dispatch(push(ROUTES.auth.main))
    }, [user])
    return (
        <AuthWrapper>
            <div className={styles.form}>
                <ErrorCheckEmailIcon className={`icon ${result.error_check_email.iconClassName}`} />
                <div>
                    <h1 className={styles.title}>{result.error_check_email.title}</h1>
                    <p className={`${styles.text} ${styles.long_text}`}>{result.error_check_email.text}</p>
                </div>
                <Button
                    type="primary"
                    onClick={navigateTo}
                    className={`${styles.button} ${styles.small_button}`}
                    data-test-id='check-back-button'
                >
                    {result.error_check_email.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


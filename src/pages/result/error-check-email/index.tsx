import { result } from "@constants/resultPageData"
import { ROUTES } from "@constants/routes"
import { ErrorCheckEmailIcon } from "../../../assets/icons/ErrorCheckEmailIcon"
import { useAppSelector, useAppDispatch } from "@hooks/typed-react-redux-hooks"
import { setData } from "@redux/slices/user-slice"
import { useEffect } from "react"
import { push } from "redux-first-history"
import styles from '../styles.module.scss'
import '../icons.scss'
import { AuthWrapper } from "@components/AuthWrapper"
import { Button } from "antd"

export const ErrorCheckEmail: React.FC = () => {
    const { user } = useAppSelector(state => state.user)
    const { pathname } = useAppSelector(state => state.user.authData)

    const dispatch = useAppDispatch()
    const goTo = () => {
        dispatch(push(ROUTES.auth.main))
    }

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (pathname === 'error_check_email') {
            return
        } else dispatch(push(ROUTES.auth.main));
        return () => {
            dispatch(setData({}))
        }
    }, [user, pathname])
    return (
        <AuthWrapper>
            <div className={styles.form}>
                <ErrorCheckEmailIcon className={`icon ${result.error_check_email.iconClassName}`} />
                <div>
                    <h1 className={styles.title}>{result.error_check_email.title}</h1>
                    <p className={styles.text}>{result.error_check_email.text}</p>
                </div>
                <Button
                    type="primary"
                    onClick={goTo}
                    className={styles.button}
                    data-test-id='check-back-button'
                >
                    {result.error_check_email.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


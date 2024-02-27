import { WarningFilled } from "@ant-design/icons"
import { result } from "@constants/resultPageData"
import { ROUTES } from "@constants/routes"
import { AuthWrapper } from "@components/AuthWrapper"
import { Button } from "antd"
import styles from '../styles.module.scss'
import '../icons.scss'
import { useAppSelector, useAppDispatch } from "@hooks/typed-react-redux-hooks"
import { setData } from "@redux/slices/user-slice"
import { useEffect } from "react"
import { push } from "redux-first-history"

export const ErrorLogin: React.FC = () => {
    const { user } = useAppSelector(state => state.user)
    const { pathname } = useAppSelector(state => state.user.authData)

    const dispatch = useAppDispatch()
    const goTo = () => {
        dispatch(push(ROUTES.auth.registration))
    }

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (pathname === 'auth') {
            return
        } else dispatch(push(ROUTES.auth.main));
        return () => {
            dispatch(setData({}))
        }
    }, [user, pathname])
    return (
        <AuthWrapper>
            <div className={styles.form}>
                <WarningFilled className={`icon ${result.error_login.iconClassName}`} />
                <div>
                    <h1 className={styles.title}>{result.error_login.title}</h1>
                    <p className={styles.text}>{result.error_login.text}</p>
                </div>
                <Button
                    type="primary"
                    onClick={goTo}
                    className={styles.button}
                    data-test-id='login-retry-button'
                >
                    {result.error_login.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


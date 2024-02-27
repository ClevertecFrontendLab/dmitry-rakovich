import { result } from "@constants/resultPageData"
import { ROUTES } from "@constants/routes"
import { CloseCircleFilled } from "@ant-design/icons"
import { AuthWrapper } from "@components/AuthWrapper"
import { Button } from "antd"
import styles from '../styles.module.scss'
import '../icons.scss'
import { useAppSelector, useAppDispatch } from "@hooks/typed-react-redux-hooks"
import { push } from "redux-first-history"
import { setData } from "@redux/slices/user-slice"
import { useEffect } from "react"

export const ErrorChangePassword: React.FC = () => {
    const { user } = useAppSelector(state => state.user)
    const { pathname } = useAppSelector(state => state.user.authData)

    const dispatch = useAppDispatch()
    const goTo = () => {
        dispatch(push(ROUTES.auth.change_password))
    }
    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (pathname === 'error-change-password') {
            return
        } else dispatch(push(ROUTES.auth.main));
        return () => {
            dispatch(setData({}))
        }
    }, [user, pathname])
    return (
        <AuthWrapper>
            <div className={styles.form}>
                <CloseCircleFilled className={`icon ${result.error_change_password.iconClassName}`} />
                <div>
                    <h1 className={styles.title}>{result.error_change_password.title}</h1>
                    <p className={styles.text}>{result.error_change_password.text}</p>
                </div>
                <Button
                    type="primary"
                    onClick={goTo}
                    className={styles.button}
                    data-test-id='change-retry-button'
                >
                    {result.error_change_password.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


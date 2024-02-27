import { WarningFilled } from "@ant-design/icons"
import { result } from "@constants/resultPageData"
import { ROUTES } from "@constants/routes"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { useEffect } from "react"
import { push } from "redux-first-history"
import { setData } from "@redux/slices/user-slice"
import { AuthWrapper } from "@components/AuthWrapper"
import { Button } from "antd"
import styles from '../styles.module.scss'
import '../icons.scss'


export const ErrorCheckEmailNoExist: React.FC = () => {
    const { pathname } = useAppSelector(state => state.user.authData)
    const { user } = useAppSelector(state => state.user)

    const dispatch = useAppDispatch()

    const goTo = () => {
        dispatch(push(ROUTES.auth.main))
    }
    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (pathname === 'check-email') {
            return
        } else dispatch(push(ROUTES.auth.main));
        return () => {
            dispatch(setData({}))
        }
    }, [user, pathname])


    return (
        <AuthWrapper>
            <div className={styles.form}>
                <WarningFilled className={`icon ${result.error_check_email_no_exist.iconClassName}`} />
                <div>
                    <h1 className={styles.title}>{result.error_check_email_no_exist.title}</h1>
                    <p className={styles.text}>{result.error_check_email_no_exist.text}</p>
                </div>
                <Button
                    type="primary"
                    onClick={goTo}
                    className={styles.button}
                    data-test-id='check-retry-button'
                >
                    {result.error_check_email_no_exist.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


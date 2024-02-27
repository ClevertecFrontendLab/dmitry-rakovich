import { ROUTES } from "@constants/routes"
import { CheckCircleFilled } from "@ant-design/icons"
import { result } from "@constants/resultPageData"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { useEffect } from "react"
import { push } from "redux-first-history"
import { setData } from "@redux/slices/user-slice"
import { AuthWrapper } from "@components/AuthWrapper"
import { Button } from "antd"
import styles from '../styles.module.scss'
import '../icons.scss'


export const RegisterSuccess: React.FC = () => {
    const { user } = useAppSelector(state => state.user)
    const { pathname } = useAppSelector(state => state.user.authData)

    const dispatch = useAppDispatch()
    const goTo = () => {
        dispatch(push(ROUTES.auth.main))
    }

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (pathname === 'register') {
            return
        } else dispatch(push(ROUTES.auth.main));
        return () => {
            dispatch(setData({}))
        }
    }, [user, pathname])
    return (
        <AuthWrapper>
            <div className={styles.form}>
                <CheckCircleFilled className={`icon ${result.success.iconClassName}`} />
                <div>
                    <h1 className={styles.title}>{result.success.title}</h1>
                    <p className={styles.text}>{result.success.text}</p>
                </div>
                <Button
                    data-test-id='registration-enter-button'
                    type="primary"
                    onClick={goTo}
                    className={styles.button}
                >
                    {result.success.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}



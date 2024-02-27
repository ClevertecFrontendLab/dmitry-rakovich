import { CloseCircleFilled } from "@ant-design/icons"
import { ROUTES } from "@constants/routes"
import { Result } from ".."
import { result } from "@constants/resultPageData"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { useEffect } from "react";
import { push } from "redux-first-history";
import { setData } from "@redux/slices/user-slice";
import { AuthWrapper } from "@components/AuthWrapper";
import { Button } from "antd";
import styles from '../styles.module.scss'
import '../icons.scss'

export const ErrorOther: React.FC = () => {
    const dispatch = useAppDispatch()
    const authData = useAppSelector(state => state.user.authData)
    const { user } = useAppSelector(state => state.user)
    const { pathname } = useAppSelector(state => state.user.authData)

    const goTo = () => {
        dispatch(push(ROUTES.auth.registration))
    }

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (pathname === 'register_error') {
            return
        } else dispatch(push(ROUTES.auth.main));
        return () => {
            dispatch(setData({}))
        }
    }, [user, pathname])

    useEffect(() => {
        if (!authData.pathname) dispatch(push(ROUTES.auth.main))
    }, [authData])
    return (
        <AuthWrapper>
            <div className={styles.form}>
                <CloseCircleFilled className={`icon ${result.error_other.iconClassName}`} />
                <div>
                    <h1 className={styles.title}>{result.error_other.title}</h1>
                    <p className={styles.text}>{result.error_other.text}</p>
                </div>
                <Button
                    type="primary"
                    onClick={goTo}
                    className={styles.button}
                    data-test-id='registration-retry-button'
                >
                    {result.error_other.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


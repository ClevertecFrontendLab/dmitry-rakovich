import { ROUTES } from "@constants/routes"
import { CheckCircleFilled } from "@ant-design/icons"
import { result } from "@constants/resultPageData"
import styles from '../styles.module.scss'
import '../icons.scss'
import { AuthWrapper } from "@components/AuthWrapper"
import { Button } from "antd"
import { push } from "redux-first-history"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { useEffect } from "react"

export const SuccessChangePassword: React.FC = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.user)
    const { pathname } = useAppSelector(state => state.user.authData)
    const { previousLocations } = useAppSelector(state => state.router)

    const goTo = () => {
        dispatch(push(ROUTES.auth.main))
    }

    useEffect(() => {
        console.log(previousLocations);

        if (user) dispatch(push(ROUTES.main))
        if (pathname !== 'success_change_password') {
            dispatch(push(ROUTES.auth.main))
        }

    }, [user, pathname])
    return (
        <AuthWrapper>
            <div className={styles.form}>
                < CheckCircleFilled className={`icon ${result.success_change_password.iconClassName}`
                } />
                <div>
                    <h1 className={styles.title}>{result.success_change_password.title}</h1>
                    <p className={styles.text}>{result.success_change_password.text}</p>
                </div>
                <Button
                    type="primary"
                    onClick={goTo}
                    className={styles.button}
                    data-test-id='change-entry-button'
                >
                    {result.success_change_password.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


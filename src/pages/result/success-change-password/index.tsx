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

    const navigateTo = () => {
        dispatch(push(ROUTES.auth.main))
    }

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.auth.change_password) {
                return
            }
        }
        dispatch(push(ROUTES.auth.main))

    }, [user])
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
                    onClick={navigateTo}
                    className={styles.button}
                    data-test-id='change-entry-button'
                >
                    {result.success_change_password.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


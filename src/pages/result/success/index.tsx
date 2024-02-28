import { ROUTES } from "@constants/routes"
import { CheckCircleFilled } from "@ant-design/icons"
import { result } from "@constants/resultPageData"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { useEffect } from "react"
import { push } from "redux-first-history"
import { AuthWrapper } from "@components/AuthWrapper"
import { Button } from "antd"
import styles from '../styles.module.scss'
import '../icons.scss'
import { userSelector } from "@redux/selectors"


export const RegisterSuccess: React.FC = () => {
    const user = useAppSelector(userSelector)

    const dispatch = useAppDispatch()
    const navigateTo = () => {
        dispatch(push(ROUTES.auth.main))
    }

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.auth.registration) {
                return
            }
        }
        dispatch(push(ROUTES.auth.main));
    }, [user])
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
                    onClick={navigateTo}
                    className={styles.button}
                >
                    {result.success.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}



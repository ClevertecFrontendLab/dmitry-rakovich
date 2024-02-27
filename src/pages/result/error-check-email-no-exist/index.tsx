import { WarningFilled } from "@ant-design/icons"
import { result } from "@constants/resultPageData"
import { ROUTES } from "@constants/routes"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks"
import { useEffect } from "react"
import { push } from "redux-first-history"
import { AuthWrapper } from "@components/AuthWrapper"
import { Button } from "antd"
import styles from '../styles.module.scss'
import '../icons.scss'
import { userSelector } from "@redux/selectors"


export const ErrorCheckEmailNoExist: React.FC = () => {
    const user = useAppSelector(userSelector)

    const dispatch = useAppDispatch()

    const navigateTo = () => {
        dispatch(push(ROUTES.auth.main))
    }
    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (history.state.usr) {
            if (history.state.usr.from == ROUTES.auth.main) {
                return
            }
        }
        dispatch(push(ROUTES.auth.main))
    }, [user])


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
                    onClick={navigateTo}
                    className={styles.button}
                    data-test-id='check-retry-button'
                >
                    {result.error_check_email_no_exist.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


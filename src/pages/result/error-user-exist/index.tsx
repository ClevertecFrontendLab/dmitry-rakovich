import { ROUTES } from "@constants/routes"
import { CloseCircleFilled } from "@ant-design/icons"
import { result } from "@constants/resultPageData"
import styles from '../styles.module.scss'
import '../icons.scss'
import { AuthWrapper } from "@components/AuthWrapper"
import { useAppSelector, useAppDispatch } from "@hooks/typed-react-redux-hooks"
import { Button } from "antd"
import { useEffect } from "react"
import { push } from "redux-first-history"

export const ErrorUserExist: React.FC = () => {
    const { user } = useAppSelector(state => state.user)

    const dispatch = useAppDispatch()
    const goTo = () => {
        dispatch(push(ROUTES.auth.registration, {
            from: ROUTES.result.error.user_exist
        }))
    }

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        console.log(history);

        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.auth.registration) {
                return
            }
        }
        dispatch(push(ROUTES.auth.registration));
    }, [user])
    return (
        <AuthWrapper>
            <div className={styles.form}>
                <CloseCircleFilled className={`icon ${result.error_user_exist.iconClassName}`} />
                <div>
                    <h1 className={styles.title}>{result.error_user_exist.title}</h1>
                    <p className={styles.text}>{result.error_user_exist.text}</p>
                </div>
                <Button
                    type="primary"
                    onClick={goTo}
                    className={styles.button}
                    data-test-id='registration-back-button'
                >
                    {result.error_user_exist.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}
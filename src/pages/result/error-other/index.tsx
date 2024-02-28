import { CloseCircleFilled } from "@ant-design/icons"
import { ROUTES } from "@constants/routes"
import { result } from "@constants/resultPageData"
import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks";
import { useEffect } from "react";
import { push } from "redux-first-history";
import { AuthWrapper } from "@components/AuthWrapper";
import { Button } from "antd";
import styles from '../styles.module.scss'
import '../icons.scss'
import { userSelector } from "@redux/selectors";

export const ErrorOther: React.FC = () => {
    const dispatch = useAppDispatch()
    const user  = useAppSelector(userSelector)

    const navigateTo = () => {
        dispatch(push(ROUTES.auth.registration, {
            from: ROUTES.result.error.other
        }))
    }

    useEffect(() => {
        if (user) dispatch(push(ROUTES.main))
        if (history.state.usr) {
            if (history.state.usr.from === ROUTES.auth.registration)
                return
        }
        dispatch(push(ROUTES.auth.main));
    }, [user])

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
                    onClick={navigateTo}
                    className={styles.button}
                    data-test-id='registration-retry-button'
                >
                    {result.error_other.buttonText}
                </Button>
            </div>
        </AuthWrapper>
    )
}


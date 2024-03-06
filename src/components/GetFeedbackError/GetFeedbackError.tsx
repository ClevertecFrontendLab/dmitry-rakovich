import { Button, Modal } from 'antd'
import styles from './styles.module.scss'
import { result } from '@constants/resultPageData'
import { ErrorCheckEmailIcon } from '../../assets/icons/ErrorCheckEmailIcon'
import { ROUTES } from '@constants/routes'
import { push } from 'redux-first-history'
import { useAppDispatch } from '@hooks/typed-react-redux-hooks'


export const GetFeedbackError = () => {
    const dispatch = useAppDispatch()
    const handleGoBack = () => {
        dispatch(push(ROUTES.auth.main));
    };

    return (
        <Modal centered open footer='' closable={false}>
            <div className={styles.form}>
                <ErrorCheckEmailIcon className={styles.icon} />
                <div>
                    <h1 className={styles.title}>{result.error_get_feedback.title}</h1>
                    <p className={styles.text}>{result.error_get_feedback.text}</p>
                </div>
                <Button
                    type="primary"
                    className={styles.button}
                    onClick={handleGoBack}
                >
                    {result.error_get_feedback.buttonText}
                </Button>
            </div>
        </Modal>
    )
}

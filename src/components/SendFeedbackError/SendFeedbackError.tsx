import { Button, Modal } from 'antd'
import styles from './styles.module.scss'
import { CloseCircleFilled } from '@ant-design/icons'
import { result } from '@constants/resultPageData'

type Props = {
    setIsError: React.Dispatch<React.SetStateAction<boolean>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SendFeedbackError = ({ setIsError, setIsOpen }: Props) => {
    const handleWriteFeedback = () => {
        setIsError(false)
        setIsOpen(true)
    };

    return (
        <Modal centered open footer='' closable={false} className={styles.modal}>
            <div className={styles.form}>
                <CloseCircleFilled className={styles.icon} />
                <div>
                    <h1 className={styles.title}>{result.error_send_feedback.title}</h1>
                    <p className={styles.text}>{result.error_send_feedback.text}</p>
                </div>
                <div className={styles.buttons}>
                    <Button
                        data-test-id='write-review-not-saved-modal'
                        type="primary"
                        className={styles.button}
                        onClick={handleWriteFeedback}
                    >
                        Написать отзыв
                    </Button>
                    <Button
                        type="default"
                        className={`${styles.button} ${styles.button_close}`}
                        onClick={() => setIsError(false)}
                    >
                        Закрыть
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

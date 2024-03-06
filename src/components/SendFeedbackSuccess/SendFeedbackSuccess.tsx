import { Button, Modal } from 'antd'
import styles from './styles.module.scss'
import { CheckCircleFilled } from '@ant-design/icons'
import { result } from '@constants/resultPageData'

type Props = {
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

export const SendFeedbackSuccess = ({ setIsSuccess }: Props) => {
    return (
        <Modal centered open footer='' closable={false}>
            <div className={styles.form}>
                <CheckCircleFilled className={styles.icon} />
                <div>
                    <h1 className={styles.title}>{result.success_send_feedback.title}</h1>
                    <p className={styles.text}>{result.success_send_feedback.text}</p>
                </div>
                <Button
                    type="primary"
                    className={styles.button}
                    onClick={() => setIsSuccess(false)}
                >
                    {result.success_send_feedback.buttonText}
                </Button>
            </div>
        </Modal>
    )
}

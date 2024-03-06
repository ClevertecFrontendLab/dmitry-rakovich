import { Button } from 'antd'
import styles from './styles.module.scss'
type Props = {
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const FirstFeedback: React.FC<Props> = ({ setState }) => {
    return (
        <div className={styles.container}>
            <div className={styles.first_feedback}>

                <h2 className={styles.title}>Оставьте свой отзыв первым</h2>
                <p className={styles.text}>Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим мнением и опытом с другими пользователями, и помогите им сделать правильный выбор.</p>
            </div>
            <Button
                data-test-id='write-review'
                type="primary"
                className={styles.button}
                onClick={() => setState(true)}
            >
                Написать отзыв
            </Button>
        </div>
    )
}
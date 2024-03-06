import { StarTwoTone, UserOutlined } from '@ant-design/icons'
import { IFeedback } from '../../types/index'
import styles from './styles.module.scss'
import { Rate } from 'antd'


export const Feedback: React.FC<IFeedback> = ({ message, rating, imageSrc, fullName, createdAt }) => {
    return (
        <div className={styles.feedback}>
            <div className={styles.user}>
                {imageSrc ? <img className={styles.avatar} src={imageSrc} alt="" /> : <div className={styles.avatar}><UserOutlined /></div>}
                <span className={styles.full_name}>{fullName ?? 'Пользователь'}</span>
            </div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <Rate
                        value={rating}
                        disabled
                        className={styles.rate}
                        character={<StarTwoTone twoToneColor='#FAAD14' />}
                    />
                    <div className={styles.date}>{new Date(createdAt).toLocaleDateString()}</div>
                </div>
                <div className={styles.message}>{message}</div>
            </div>
        </div>
    )
}

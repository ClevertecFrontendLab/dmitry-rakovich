import styles from './styles.module.scss'
import { AndroidFilled, AppleFilled } from '@ant-design/icons'

export const CardsBottom = () => {
    return (
        <div className={styles.wrapper}>
            <a href='' className={styles.link}>Смотреть отзывы</a>
            <div className={styles.card}>
                <div className={styles.top}>
                    <a className={styles.link} href="">Скачать на телефон</a>
                    <p className={styles.hint}>Доступно в PRO-тарифе</p>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.store}>
                        <AndroidFilled />
                        <span>Android OS</span>
                    </div>
                    <div className={styles.store}>
                        <AppleFilled />
                        <span>Apple iOS</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

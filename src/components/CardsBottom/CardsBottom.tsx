import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import { AndroidFilled, AppleFilled } from '@ant-design/icons'
import { ROUTES } from '@constants/routes'
import { Button } from 'antd'
import { useAppDispatch } from '@hooks/typed-react-redux-hooks'
import { push } from 'redux-first-history'

export const CardsBottom = () => {
    const dispatch = useAppDispatch()
    return (
        <div className={styles.wrapper}>
            <Button onClick={() => dispatch(push(ROUTES.feedbacks))} type='link' className={styles.button} data-test-id='see-reviews'>Смотреть отзывы</Button>
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

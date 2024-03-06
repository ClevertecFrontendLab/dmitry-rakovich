import { HeartFilled } from "@ant-design/icons"
import { Card } from '@components/Card'
import { CardWithIcon } from '@components/CardWithIcon'
import styles from './styles.module.scss'
import { Calendar, Profile } from "../../assets/icons"
import { CardsBottom } from "@components/CardsBottom/CardsBottom"
import { Header } from "@components/Header"

const texts = {

    description: `
        С CleverFit ты сможешь:
        <br />
        — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
        <br />
        — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;
        <br />
        — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;
        <br />
        — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.
    `,
    advertisement: `
        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
        Не откладывай на завтра — начни тренироваться уже сегодня!
    `
}


export const Main: React.FC = () => {
    return (
        <>
            <Header />
            <div className={styles.main}>
                <Card text={texts.description} color='#061178' marginBottom='24px' />
                <Card text={texts.advertisement} color='' fontSize='20px' fontWeight='500' marginBottom='16px' />
                <div className={styles.cards}>
                    <CardWithIcon title='Расписать тренировки' label='Тренировки' icon={<HeartFilled />} />
                    <CardWithIcon title='Назначить календарь' label='Календарь' icon={<Calendar />} />
                    <CardWithIcon title='Заполнить профиль' label='Профиль' icon={<Profile />} />
                </div>
                <CardsBottom />
            </div>
        </>
    )
}
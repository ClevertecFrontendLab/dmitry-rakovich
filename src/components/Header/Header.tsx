import { Breadcrumb, Button } from "antd/"

import styles from './styles.module.scss'
import { SettingOutlined } from "@ant-design/icons"

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Breadcrumb separator={<span></span>}>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.header_bottom}>
                <div className={styles.header_left}>
                    <h1 className={styles.title}>Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей мечты!</h1>
                </div>
                <div className={styles.header_right}>
                    <Button className={styles.button} size="middle" type="text" icon={<SettingOutlined style={{ marginLeft: 10 }} />}><span className={styles.button_text}>Настройки</span></Button>
                </div>
            </div>
        </header>
    )
}
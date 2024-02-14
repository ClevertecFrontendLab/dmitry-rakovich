import logo from '../../assets/logo.svg';

import styles from "./styles.module.scss"
import { Calendar, Exit, Profile } from "../../assets/icons"
import { HeartFilled, TrophyFilled } from "@ant-design/icons"
import { Switcher } from '@components/Switcher/Switcher';

interface SwitcherProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export const NavigationDesktop: React.FC<SwitcherProps> = ({ collapsed, setCollapsed }) => {

    return (
        <>
            <nav className={styles.sidebar}>
                <div className={`${styles.logo} logo`}>
                    <img src={logo} alt="" />
                </div>
                <ul className={styles.menu}>
                    <li className={`${styles.item} menu_item`}><Calendar className={styles.icon} /><span className='menu_text'>Календарь</span></li>
                    <li className={`${styles.item} menu_item`}><HeartFilled className={styles.icon} /><span className='menu_text'>Тренировки</span></li>
                    <li className={`${styles.item} menu_item`}><TrophyFilled className={styles.icon} /><span className='menu_text'>Достижения</span></li>
                    <li className={`${styles.item} menu_item`}><Profile className={styles.icon} /> <span className='menu_text'>Профиль</span></li>
                </ul>
                <button className={styles.button}><Exit /><span className='menu_text'>Выход</span></button>
            </nav>
            <Switcher data='sider-switch' collapsed={collapsed} setCollapsed={setCollapsed} />
        </>
    )
}

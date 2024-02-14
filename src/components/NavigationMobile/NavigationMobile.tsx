import { Switcher } from '@components/Switcher/Switcher'
import styles from './styles.module.scss'
import logo from '../../assets/logo.svg'

interface SwitcherProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export const NavigationMobile: React.FC<SwitcherProps> = ({ collapsed, setCollapsed }) => {
    return (
        <>
            <nav className={styles.sidebar}>
                <div className={`${styles.logo} logo`}>
                    <img src={logo} alt="" />
                </div>
                <ul className={styles.menu}>
                    <li className={`${styles.item} menu_item`}><span className='menu_text'>Календарь</span></li>
                    <li className={`${styles.item} menu_item`}><span className='menu_text'>Тренировки</span></li>
                    <li className={`${styles.item} menu_item`}><span className='menu_text'>Достижения</span></li>
                    <li className={`${styles.item} menu_item`}><span className='menu_text'>Профиль</span></li>
                </ul>
                <button className={styles.button}><span className='menu_text'>Выход</span></button>
            </nav>
            <Switcher data='sider-switch-mobile' collapsed={collapsed} setCollapsed={setCollapsed} />
        </>
    )
}

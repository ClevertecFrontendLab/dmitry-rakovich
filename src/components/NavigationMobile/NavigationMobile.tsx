import { Switcher } from '@components/Switcher/Switcher'
import styles from './styles.module.scss'
import logo from '../../assets/logo.svg'
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { signOut } from '@redux/slices/user-slice';

interface SwitcherProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

export const NavigationMobile: React.FC<SwitcherProps> = ({ collapsed, setCollapsed }) => {
    const dispatch = useAppDispatch()
    const logOut = () => {
        dispatch(signOut())
    }
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
                <button className={styles.button} onClick={logOut}><span className='menu_text'>Выход</span></button>
            </nav>
            <Switcher data='sider-switch-mobile' collapsed={collapsed} setCollapsed={setCollapsed} />
        </>
    )
}

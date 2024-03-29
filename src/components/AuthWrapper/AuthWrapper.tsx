import { PropsWithChildren } from "react"
import styles from './styles.module.scss'

export const AuthWrapper: React.FC<PropsWithChildren> = ({ children }) =>
    <div className={styles.wrapper}>
        <div className={styles.blur}></div>
        {children}
    </div>
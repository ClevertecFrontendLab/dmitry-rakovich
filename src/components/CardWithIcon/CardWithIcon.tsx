import { ReactNode } from 'react';
import styles from './styles.module.scss'

interface Props {
    title: string;
    label: string;
    icon: ReactNode
}

export const CardWithIcon: React.FC<Props> = ({ title, icon, label }) => {
    return (
        <div className={styles.card}>
            <div className={styles.top}>{title}</div>
            <div className={styles.bottom}>
                {icon}
                <span>{label}</span>
            </div>
        </div>
    )
}
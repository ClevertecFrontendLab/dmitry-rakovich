import styles from './styles.module.scss'

interface CardProps {
    text: string;
    color: string;
    fontWeight?: string;
    fontSize?: string;
    marginBottom?: string
}

export const Card: React.FC<CardProps> = ({ text, color, fontSize = '16px', fontWeight = '400', marginBottom = '' }) => {
    return (
        <div className={styles.card} style={{ marginBottom }}>
            <p
                style={{ color: color, fontSize, fontWeight }}
                dangerouslySetInnerHTML={{ __html: text }}
            />
        </div>
    )
}
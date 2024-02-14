import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import styles from './styles.module.scss'

interface SwitcherProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    data: string;
}

export const Switcher: React.FC<SwitcherProps> = ({ collapsed, setCollapsed, data }) => {
    return (
        <div className={styles.switcher} data-test-id={data} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
                <MenuUnfoldOutlined />
            ) : (
                <MenuFoldOutlined />
            )}
        </div>
    );
};

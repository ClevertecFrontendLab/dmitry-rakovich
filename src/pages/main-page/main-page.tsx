import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { Header } from '@components/Header';
import { NavigationDesktop } from '@components/NavigationDesktop';
import { Main } from '@components/Main';
import './main-page.scss';
import { NavigationMobile } from '@components/NavigationMobile';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';
import { ROUTES } from '@constants/routes';
import { Loader } from '@components/Loader/Loader';
import { userSelector } from '@redux/selectors';

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const user = useAppSelector(userSelector)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!user) dispatch(push(ROUTES.auth.main))
        setIsLoading(false)
    }, [user])
    return (
        <Layout hasSider>
            {isLoading && <Loader />}
            <Sider className='desktop-sider' collapsible trigger={null} theme='light' collapsed={collapsed} width={208} collapsedWidth={64}>
                <NavigationDesktop collapsed={collapsed} setCollapsed={setCollapsed} />
            </Sider>
            <Sider
                style={{
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                className='mobile-sider' collapsible trigger={null} theme='light' collapsed={collapsed} width={106} collapsedWidth={0}>
                <NavigationMobile collapsed={collapsed} setCollapsed={setCollapsed} />
            </Sider>
            <Layout className='main'>
                <Header />
                <Main />
            </Layout>
        </Layout>
    );
};

import { Outlet } from 'react-router-dom'
import { NavigationDesktop } from '@components/NavigationDesktop'
import { NavigationMobile } from '@components/NavigationMobile'
import { Layout } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import { useState } from 'react'

export const RootLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <Layout hasSider>
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
                <Outlet />
            </Layout>
        </Layout>
    )
}

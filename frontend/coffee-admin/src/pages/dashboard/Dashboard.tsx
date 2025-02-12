import { Layout, Menu, Button, Dropdown } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectUser } from '../../store/slices/authSlice';
import { selectMenuItems, selectCollapsed, toggleCollapsed } from '../../store/slices/menuSlice';
import { useLogout } from '../../api/auth';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const menuItems = useAppSelector(selectMenuItems);
    const collapsed = useAppSelector(selectCollapsed);
    const { mutate: logout } = useLogout();

    const handleMenuClick = ({ key }: { key: string }) => {
        navigate(key);
    };

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                navigate('/login');
            },
        });
    };

    const userMenuItems: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: '个人信息',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            onClick: handleLogout,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                className="app-layout__sider"
            >
                <div style={{ 
                    height: 64, 
                    margin: 16, 
                    color: '#6F4E37',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    lineHeight: '64px',
                    fontSize: collapsed ? 14 : 18
                }}>
                    {collapsed ? '☕' : '咖啡后台管理'}
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                <Header className="app-layout__header">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => dispatch(toggleCollapsed())}
                        style={{ fontSize: '16px', width: 64, height: 64 }}
                    />
                    <div style={{ float: 'right', marginRight: 24 }}>
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                            <Button type="text" icon={<UserOutlined />}>
                                {user?.username}
                            </Button>
                        </Dropdown>
                    </div>
                </Header>
                <Content className="app-layout__content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;

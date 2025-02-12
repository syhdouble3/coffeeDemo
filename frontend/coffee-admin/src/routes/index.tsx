import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { Spin } from 'antd';
import { RouteConfig } from '../types';
import AuthGuard from '../components/AuthGuard';

// 懒加载组件
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const UserManagement = lazy(() => import('../pages/dashboard/UserManagement'));
const MenuManagement = lazy(() => import('../pages/dashboard/MenuManagement'));

// 加载中组件
const LoadingComponent = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
    </div>
);

// 路由配置
export const routes: RouteConfig[] = [
    {
        path: '/',
        element: (
            <AuthGuard>
                <Navigate to="/dashboard" replace />
            </AuthGuard>
        ),
        meta: {
            title: '首页',
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <Login />
            </Suspense>
        ),
        meta: {
            title: '登录',
            requiresAuth: false,
        },
    },
    {
        path: '/register',
        element: (
            <Suspense fallback={<LoadingComponent />}>
                <Register />
            </Suspense>
        ),
        meta: {
            title: '注册',
            requiresAuth: false,
        },
    },
    {
        path: '/dashboard',
        element: (
            <AuthGuard>
                <Suspense fallback={<LoadingComponent />}>
                    <Dashboard />
                </Suspense>
            </AuthGuard>
        ),
        meta: {
            title: '控制台',
            requiresAuth: true,
        },
        children: [
            {
                path: 'users',
                element: (
                    <AuthGuard>
                        <Suspense fallback={<LoadingComponent />}>
                            <UserManagement />
                        </Suspense>
                    </AuthGuard>
                ),
                meta: {
                    title: '用户管理',
                    requiresAuth: true,
                    permissions: ['admin'],
                },
            },
            {
                path: 'menus',
                element: (
                    <AuthGuard>
                        <Suspense fallback={<LoadingComponent />}>
                            <MenuManagement />
                        </Suspense>
                    </AuthGuard>
                ),
                meta: {
                    title: '菜单管理',
                    requiresAuth: true,
                    permissions: ['admin'],
                },
            },
        ],
    },
    {
        path: '*',
        element: (
            <AuthGuard>
                <Navigate to="/dashboard" replace />
            </AuthGuard>
        ),
        meta: {
            title: '404',
            requiresAuth: true,
        },
    },
];

// 将 RouteConfig[] 转换为 RouteObject[]
export const convertToRouteObjects = (routes: RouteConfig[]): RouteObject[] => {
    return routes.map(({ meta, ...rest }) => {
        if (rest.children) {
            return {
                ...rest,
                children: convertToRouteObjects(rest.children),
            };
        }
        return rest;
    });
};

export default routes;

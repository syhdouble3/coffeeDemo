import { ReactNode } from 'react';

// 用户相关类型
export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginParams {
    username: string;
    password: string;
}

export interface RegisterParams extends LoginParams {
    email: string;
    confirmPassword: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

// 菜单相关类型
export interface MenuResponse {
    id: number;
    name: string;
    sort: number;
    parentId: number;
    parentName: string;
    children: MenuResponse[];
    path: string;
    code: string;
    remark: string;
    createTime: string;
    updateTime: string;
}

export interface MenuItem {
    key: string;
    label: string;
    icon?: string;
    path: string;
    children?: MenuItem[];
    permissions?: string[];
}

// API 响应类型
export interface ApiResponse<T = unknown> {
    data: T;
    message: string;
    status: number;
}

// 路由相关类型
export interface RouteConfig {
    path: string;
    element: ReactNode;
    children?: RouteConfig[];
    meta?: {
        title: string;
        requiresAuth: boolean;
        permissions?: string[];
    };
}

// Redux 状态类型
export interface RootState {
    auth: AuthState;
    menu: MenuState;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export interface MenuState {
    items: MenuItem[];
    collapsed: boolean;
    selectedKeys: string[];
    openKeys: string[];
}

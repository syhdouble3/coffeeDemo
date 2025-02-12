import { LoginParams, RegisterParams, LoginResponse, ApiResponse, User } from '../types';
import axios from './axios';

export const authApi = {
    // 登录
    login: async (params: LoginParams) => {
        const response = await axios.post<ApiResponse<LoginResponse>>('/auth/login', params);
        // 设置cookie,过期时间24小时(根据API文档)
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `token=${response.data.data.token}; expires=${expires}; path=/`;
        return response.data;
    },

    // 注册
    register: async (params: RegisterParams) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...registerData } = params;
        const response = await axios.post<ApiResponse<LoginResponse>>('/auth/register', registerData);
        return response.data;
    },

    // 登出
    logout: async () => {
        await axios.post('/auth/logout');
        // 清除cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },

    // 获取当前用户信息
    getCurrentUser: async () => {
        const response = await axios.get<ApiResponse<User>>('/auth/current-user');
        return response.data;
    },
};

// React Query hooks
import { useMutation, useQuery } from '@tanstack/react-query';

export const useLogin = () => {
    return useMutation({
        mutationFn: authApi.login,
        onError: (error: Error) => {
            console.error('Login failed:', error);
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: authApi.register,
        onError: (error: Error) => {
            console.error('Registration failed:', error);
        },
    });
};

export const useLogout = () => {
    return useMutation({
        mutationFn: authApi.logout,
        onError: (error: Error) => {
            console.error('Logout failed:', error);
        },
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: authApi.getCurrentUser,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

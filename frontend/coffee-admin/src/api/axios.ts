import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { message } from 'antd';

// 创建axios实例
const instance: AxiosInstance = axios.create({
    baseURL: '/api', // 使用相对路径,通过Vite代理转发请求
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 从cookie中获取token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

        if (token) {
            if (!(config.headers instanceof AxiosHeaders)) {
                config.headers = new AxiosHeaders(config.headers);
            }
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        const { data } = response;

        // 根据API文档的响应格式处理
        if (data.status !== 200) {
            message.error(data.message || '请求失败');
            return Promise.reject(new Error(data.message || '请求失败'));
        }

        return data;
    },
    (error: AxiosError) => {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    message.error('未登录或登录已过期');
                    // 清除cookie中的token
                    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    // 跳转到登录页
                    window.location.href = '/login';
                    break;
                case 403:
                    message.error('没有权限访问');
                    break;
                case 404:
                    message.error('请求的资源不存在');
                    break;
                case 500:
                    message.error('服务器错误');
                    break;
                default:
                    message.error('网络错误');
            }
        } else if (error.request) {
            message.error('网络连接失败');
        } else {
            message.error('请求配置错误');
        }
        return Promise.reject(error);
    }
);

export default instance;

import { ApiResponse, MenuResponse } from '../types';
import axios from './axios';

export interface CreateMenuParams {
    name: string;
    sort?: number;
    parentId?: number;
    path?: string;
    code: string;
    remark?: string;
}

export const menuApi = {
    // 创建菜单
    createMenu: async (params: CreateMenuParams) => {
        const response = await axios.post<ApiResponse<MenuResponse>>('/menus', params);
        return response.data;
    },

    // 更新菜单
    updateMenu: async (id: number, params: CreateMenuParams) => {
        const response = await axios.put<ApiResponse<MenuResponse>>(`/menus/${id}`, params);
        return response.data;
    },

    // 删除菜单
    deleteMenu: async (id: number) => {
        await axios.delete<ApiResponse<void>>(`/menus/${id}`);
    },

    // 获取菜单树
    getMenuTree: async () => {
        const response = await axios.get<ApiResponse<MenuResponse[]>>('/menus/tree');
        return response.data;
    },

    // 获取菜单列表
    getMenuList: async () => {
        const response = await axios.get<ApiResponse<MenuResponse[]>>('/menus');
        return response.data;
    },

    // 获取单个菜单
    getMenu: async (id: number) => {
        const response = await axios.get<ApiResponse<MenuResponse>>(`/menus/${id}`);
        return response.data;
    },
};

// React Query hooks
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCreateMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: menuApi.createMenu,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menus'] });
        },
        onError: (error: Error) => {
            console.error('Create menu failed:', error);
        },
    });
};

export const useUpdateMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, params }: { id: number; params: CreateMenuParams }) => menuApi.updateMenu(id, params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menus'] });
        },
        onError: (error: Error) => {
            console.error('Update menu failed:', error);
        },
    });
};

export const useDeleteMenu = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: menuApi.deleteMenu,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menus'] });
        },
        onError: (error: Error) => {
            console.error('Delete menu failed:', error);
        },
    });
};

export const useMenuTree = () => {
    return useQuery({
        queryKey: ['menus', 'tree'],
        queryFn: menuApi.getMenuTree,
    });
};

export const useMenuList = () => {
    return useQuery({
        queryKey: ['menus', 'list'],
        queryFn: menuApi.getMenuList,
    });
};

export const useMenu = (id: number) => {
    return useQuery({
        queryKey: ['menus', id],
        queryFn: () => menuApi.getMenu(id),
        enabled: !!id,
    });
};

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuState, MenuItem } from '../../types';

const defaultMenuItems: MenuItem[] = [
    {
        key: 'user',
        label: '用户管理',
        icon: 'UserOutlined',
        path: '/dashboard/users',
        permissions: ['admin'],
    },
    {
        key: 'menu',
        label: '菜单管理',
        icon: 'MenuOutlined',
        path: '/dashboard/menus',
        permissions: ['admin'],
    },
];

const initialState: MenuState = {
    items: defaultMenuItems,
    collapsed: false,
    selectedKeys: [],
    openKeys: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
            state.items = action.payload;
        },
        toggleCollapsed: (state) => {
            state.collapsed = !state.collapsed;
        },
        setSelectedKeys: (state, action: PayloadAction<string[]>) => {
            state.selectedKeys = action.payload;
        },
        setOpenKeys: (state, action: PayloadAction<string[]>) => {
            state.openKeys = action.payload;
        },
        resetMenu: (state) => {
            state.items = defaultMenuItems;
            state.collapsed = false;
            state.selectedKeys = [];
            state.openKeys = [];
        },
    },
});

// 导出 actions
export const { setMenuItems, toggleCollapsed, setSelectedKeys, setOpenKeys, resetMenu } = menuSlice.actions;

// 导出 selectors
export const selectMenuItems = (state: { menu: MenuState }) => state.menu.items;
export const selectCollapsed = (state: { menu: MenuState }) => state.menu.collapsed;
export const selectSelectedKeys = (state: { menu: MenuState }) => state.menu.selectedKeys;
export const selectOpenKeys = (state: { menu: MenuState }) => state.menu.openKeys;

// 导出 reducer
export default menuSlice.reducer;

import { useState } from 'react';
import { Tree, Button, Modal, Form, Input, Select, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import type { MenuItem } from '../../types';

const { Option } = Select;

// 模拟菜单数据
const mockMenus: MenuItem[] = [
    {
        key: 'dashboard',
        label: '仪表盘',
        icon: 'DashboardOutlined',
        path: '/dashboard',
        permissions: ['admin', 'user'],
    },
    {
        key: 'system',
        label: '系统管理',
        icon: 'SettingOutlined',
        path: '/dashboard/system',
        permissions: ['admin'],
        children: [
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
        ],
    },
];

const MenuManagement = () => {
    const [menus] = useState<MenuItem[]>(mockMenus);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const convertToTreeData = (menuItems: MenuItem[]): DataNode[] => {
        return menuItems.map((item) => ({
            key: item.key,
            title: (
                <Space>
                    <span>{item.label}</span>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item);
                        }}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item);
                        }}
                    />
                </Space>
            ),
            children: item.children ? convertToTreeData(item.children) : undefined,
        }));
    };

    const handleAdd = () => {
        setEditingMenu(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (menu: MenuItem) => {
        setEditingMenu(menu);
        form.setFieldsValue(menu);
        setIsModalVisible(true);
    };

    const handleDelete = (menu: MenuItem) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除菜单 ${menu.label} 吗?`,
            onOk() {
                messageApi.success('删除成功');
            },
        });
    };

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            console.log('Form values:', values);
            messageApi.success(`${editingMenu ? '更新' : '创建'}成功`);
            setIsModalVisible(false);
        });
    };

    return (
        <div>
            {contextHolder}
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    style={{ backgroundColor: '#6F4E37' }}
                >
                    添加菜单
                </Button>
            </div>
            <Tree
                treeData={convertToTreeData(menus)}
                defaultExpandAll
                showLine={{ showLeafIcon: false }}
            />
            <Modal
                title={editingMenu ? '编辑菜单' : '添加菜单'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="key"
                        label="菜单键值"
                        rules={[{ required: true, message: '请输入菜单键值' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="label"
                        label="菜单名称"
                        rules={[{ required: true, message: '请输入菜单名称' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="icon"
                        label="图标"
                        rules={[{ required: true, message: '请选择图标' }]}
                    >
                        <Select>
                            <Option value="DashboardOutlined">仪表盘</Option>
                            <Option value="UserOutlined">用户</Option>
                            <Option value="MenuOutlined">菜单</Option>
                            <Option value="SettingOutlined">设置</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="path"
                        label="路径"
                        rules={[{ required: true, message: '请输入路径' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="permissions"
                        label="权限"
                        rules={[{ required: true, message: '请选择权限' }]}
                    >
                        <Select mode="multiple">
                            <Option value="admin">管理员</Option>
                            <Option value="user">普通用户</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MenuManagement;

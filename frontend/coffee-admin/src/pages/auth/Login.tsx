import { Form, Input, Button, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../../api/auth';
import { useAppDispatch } from '../../store';
import { setUser, setToken } from '../../store/slices/authSlice';
import { LoginParams } from '../../types';
import '../../styles/global.scss';

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { mutate: login, isPending } = useLogin();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: LoginParams) => {
        login(values, {
            onSuccess: (data) => {
                dispatch(setUser(data.user));
                dispatch(setToken(data.token));
                messageApi.success('登录成功');
                navigate('/dashboard');
            },
            onError: (error) => {
                messageApi.error(error.message || '登录失败');
            },
        });
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            {contextHolder}
            <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <h2 className="text-center" style={{ marginBottom: 24, color: '#6F4E37' }}>
                    咖啡后台管理系统
                </h2>
                <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="用户名"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="密码"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isPending}
                            block
                            size="large"
                            style={{ backgroundColor: '#6F4E37' }}
                        >
                            登录
                        </Button>
                    </Form.Item>

                    <div className="text-center">
                        <Link to="/register" style={{ color: '#6F4E37' }}>
                            还没有账号?立即注册
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Login;

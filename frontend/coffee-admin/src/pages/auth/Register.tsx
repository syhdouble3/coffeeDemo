import { Form, Input, Button, message, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useRegister } from '../../api/auth';
import { RegisterParams } from '../../types';
import '../../styles/global.scss';

const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { mutate: register, isPending } = useRegister();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: RegisterParams) => {
        if (values.password !== values.confirmPassword) {
            messageApi.error('两次输入的密码不一致');
            return;
        }

        register(values, {
            onSuccess: () => {
                messageApi.success('注册成功,请登录');
                navigate('/login');
            },
            onError: (error) => {
                messageApi.error(error.message || '注册失败');
            },
        });
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            {contextHolder}
            <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <h2 className="text-center" style={{ marginBottom: 24, color: '#6F4E37' }}>
                    注册账号
                </h2>
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { min: 3, message: '用户名至少3个字符' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="用户名"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: '请输入邮箱' },
                            { type: 'email', message: '请输入有效的邮箱地址' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="邮箱"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码' },
                            { min: 6, message: '密码至少6个字符' },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="密码"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            { required: true, message: '请确认密码' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="确认密码"
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
                            注册
                        </Button>
                    </Form.Item>

                    <div className="text-center">
                        <Link to="/login" style={{ color: '#6F4E37' }}>
                            已有账号?立即登录
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Register;

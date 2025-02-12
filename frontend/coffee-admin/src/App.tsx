import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme } from 'antd';
import { store } from './store';
import routes, { convertToRouteObjects } from './routes';
import './styles/global.scss';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

const router = createBrowserRouter(convertToRouteObjects(routes));

// 自定义主题配置
const themeConfig = {
    token: {
        colorPrimary: '#6F4E37',
        fontFamily: 'Microsoft YaHei',
    },
    algorithm: theme.defaultAlgorithm,
};

const App = () => {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider theme={themeConfig}>
                    <RouterProvider router={router} />
                </ConfigProvider>
            </QueryClientProvider>
        </Provider>
    );
};

export default App;

import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface AuthGuardProps {
    children: ReactElement;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

    if (!isAuthenticated) {
        // 将用户重定向到登录页面,同时保存他们试图访问的URL
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthGuard;

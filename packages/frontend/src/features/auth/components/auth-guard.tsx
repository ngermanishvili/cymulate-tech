import { Navigate, useLocation } from 'react-router-dom';
import { APP_CONSTANTS } from '../../../core/config/constants';

interface GuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export const AuthGuard: React.FC<GuardProps> = ({
    children,
    requireAuth = false
}) => {
    const location = useLocation();
    const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);

    if (requireAuth && !token) {
        return (
            <Navigate
                to={APP_CONSTANTS.ROUTES.LOGIN}
                state={{ from: location }}
                replace
            />
        );
    }

    if (!requireAuth && token) {
        return (
            <Navigate
                to={APP_CONSTANTS.ROUTES.DASHBOARD}
                replace
            />
        );
    }

    return <>{children}</>;
};


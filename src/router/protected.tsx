import { Loader } from '@/components/loader/loader';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectRoute = {
  children: React.ReactNode;
  isAuth?: boolean;
};

type LocationState = {
  from?: string;
};

export const ProtectRoute = ({
  children,
  isAuth = false,
}: TProtectRoute): React.JSX.Element => {
  const location = useLocation();
  const locationState = location.state as LocationState;

  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (isAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!isAuth && isAuthenticated) {
    const from = locationState?.from ?? '/';
    return <Navigate to={from} replace />;
  }

  return children as React.JSX.Element;
};

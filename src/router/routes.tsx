import { AuthLayout } from '@/components/layouts/login-layout/auth-layout';
import { ProfileLayout } from '@/components/layouts/profile-layout/profile-layout';
import { RootLayout } from '@/components/layouts/root-layout/root-layout';
import { Loader } from '@/components/loader/loader';
import { OrderDetail } from '@/components/order-detail/order-detail';
import { lazy, Suspense } from 'react';
import { useRoutes, type RouteObject } from 'react-router-dom';

import { ProtectRoute } from './protected';

const Home = lazy(() =>
  import('@/pages/home').then((module) => ({ default: module.Home }))
);
const Feed = lazy(() =>
  import('@/pages/feed').then((module) => ({ default: module.Feed }))
);
const LoginPage = lazy(() =>
  import('@/pages/login').then((module) => ({ default: module.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('@/pages/register').then((module) => ({ default: module.RegisterPage }))
);
const ForgotPasswordPage = lazy(() =>
  import('@/pages/forgot-password').then((module) => ({
    default: module.ForgotPasswordPage,
  }))
);
const ResetPasswordPage = lazy(() =>
  import('@/pages/reset-password').then((module) => ({
    default: module.ResetPasswordPage,
  }))
);
const ProfilePage = lazy(() =>
  import('@/pages/profile/profile').then((module) => ({ default: module.ProfilePage }))
);
const Orders = lazy(() =>
  import('@/pages/profile/orders').then((module) => ({ default: module.Orders }))
);
const IngredientPage = lazy(() =>
  import('@/pages/ingredient').then((module) => ({ default: module.IngredientPage }))
);
const NotFound = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFound }))
);

// Обертка для ленивых компонентов с Suspense
const LazyWrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <LazyWrapper>
            <Home />
          </LazyWrapper>
        ),
      },
      {
        path: 'feed',
        element: (
          <LazyWrapper>
            <Feed />
          </LazyWrapper>
        ),
      },
      {
        path: 'feed/:id',
        element: <OrderDetail />, // OrderDetail можно тоже сделать ленивым, если нужно
      },
      {
        path: 'login',
        element: (
          <ProtectRoute>
            <AuthLayout type="login">
              {({ formData, onChange }) => (
                <LazyWrapper>
                  <LoginPage formData={formData} onChange={onChange} />
                </LazyWrapper>
              )}
            </AuthLayout>
          </ProtectRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectRoute>
            <AuthLayout type="register">
              {({ formData, onChange }) => (
                <LazyWrapper>
                  <RegisterPage formData={formData} onChange={onChange} />
                </LazyWrapper>
              )}
            </AuthLayout>
          </ProtectRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <ProtectRoute>
            <AuthLayout type="forgot-password">
              {({ formData, onChange }) => (
                <LazyWrapper>
                  <ForgotPasswordPage formData={formData} onChange={onChange} />
                </LazyWrapper>
              )}
            </AuthLayout>
          </ProtectRoute>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <ProtectRoute>
            <AuthLayout type="reset-password">
              {({ formData, onChange }) => (
                <LazyWrapper>
                  <ResetPasswordPage formData={formData} onChange={onChange} />
                </LazyWrapper>
              )}
            </AuthLayout>
          </ProtectRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectRoute isAuth={true}>
            <ProfileLayout />
          </ProtectRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <LazyWrapper>
                <ProfilePage />
              </LazyWrapper>
            ),
          },
          {
            path: 'orders',
            element: (
              <LazyWrapper>
                <Orders />
              </LazyWrapper>
            ),
          },
          {
            path: 'orders/:id',
            element: <OrderDetail />,
          },
        ],
      },
      {
        path: 'ingredients/:id',
        element: (
          <LazyWrapper>
            <IngredientPage />
          </LazyWrapper>
        ),
      },
      {
        path: '*',
        element: (
          <LazyWrapper>
            <NotFound />
          </LazyWrapper>
        ),
      },
    ],
  },
];

export const AppRoutes = (): React.JSX.Element | null => {
  const element = useRoutes(routes);
  return element;
};

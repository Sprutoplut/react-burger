import { AuthLayout } from '@/components/layouts/login-layout/auth-layout';
import { ProfileLayout } from '@/components/layouts/profile-layout/profile-layout';
import { RootLayout } from '@/components/layouts/root-layout/root-layout';
import { Feed } from '@/pages/feed';
import { ForgotPasswordPage } from '@/pages/forgot-password';
import { Home } from '@/pages/home';
import { IngredientPage } from '@/pages/ingredient';
import { LoginPage } from '@/pages/login';
import { NotFound } from '@/pages/NotFound';
import { Orders } from '@/pages/profile/orders';
import ProfilePage from '@/pages/profile/profile';
import { RegisterPage } from '@/pages/register';
import { ResetPasswordPage } from '@/pages/reset-password';
import { useRoutes, type RouteObject } from 'react-router-dom';

import { ProtectRoute } from './protected';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'feed',
        element: <Feed />,
      },
      {
        path: 'login',
        element: (
          <ProtectRoute>
            <AuthLayout type="login">
              {({ formData, onChange }) => (
                <LoginPage formData={formData} onChange={onChange} />
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
                <RegisterPage formData={formData} onChange={onChange} />
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
                <ForgotPasswordPage formData={formData} onChange={onChange} />
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
                <ResetPasswordPage formData={formData} onChange={onChange} />
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
            element: <ProfilePage />,
          },
          {
            path: 'orders',
            element: <Orders />,
          },
        ],
      },

      {
        path: 'ingredients/:id',
        element: <IngredientPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const AppRoutes = (): React.JSX.Element | null => {
  const element = useRoutes(routes);
  return element;
};

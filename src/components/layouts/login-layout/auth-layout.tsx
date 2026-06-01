import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from '@/store/api/authApi';
import { configLogin } from '@/utils/constants';
import { useState, type ChangeEvent, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { LoginLayout } from './login-layout';

import type {
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
} from '@/utils/types';

type TAuthType = 'login' | 'register' | 'forgot-password' | 'reset-password';

type LocationState = {
  from?: string;
};

type ApiError = {
  data?: {
    message?: string;
  };
  message?: string;
};

type FormDataMap = {
  login: LoginFormData;
  register: RegisterFormData;
  'forgot-password': ForgotPasswordFormData;
  'reset-password': ResetPasswordFormData;
};

type TAuthWrapperProps<T extends TAuthType> = {
  type: T;
  children: (props: {
    formData: FormDataMap[T];
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    error: ApiError | null;
  }) => ReactNode;
};

export const AuthLayout = <T extends TAuthType>({
  type,
  children,
}: TAuthWrapperProps<T>): React.JSX.Element | null => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState;

  const [login, { error: loginError, isLoading: loginLoading }] = useLoginMutation();
  const [register, { error: registerError, isLoading: registerLoading }] =
    useRegisterMutation();
  const [forgotPassword, { error: forgotError, isLoading: forgotLoading }] =
    useForgotPasswordMutation();
  const [resetPassword, { error: resetError, isLoading: resetLoading }] =
    useResetPasswordMutation();

  const [formData, setFormData] = useState<FormDataMap[T]>(() => {
    switch (type) {
      case 'login':
        return { email: '', password: '' } as FormDataMap[T];
      case 'register':
        return { name: '', email: '', password: '' } as FormDataMap[T];
      case 'forgot-password':
        return { email: '' } as FormDataMap[T];
      case 'reset-password':
        return { password: '', token: '' } as FormDataMap[T];
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isResetAllowed = localStorage.getItem('resetPasswordAllowed') === 'true';

  if (type === 'reset-password' && !isResetAllowed) {
    void navigate('/forgot-password', { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    void performSubmit();
  };

  const performSubmit = async (): Promise<void> => {
    try {
      switch (type) {
        case 'login': {
          const result = await login(formData as LoginFormData).unwrap();
          if (result.success) {
            const from = locationState?.from ?? '/';
            void navigate(from, { replace: true });
          }
          break;
        }
        case 'register': {
          await register(formData as RegisterFormData).unwrap();
          void navigate('/', { replace: true });
          break;
        }
        case 'forgot-password': {
          await forgotPassword(formData as ForgotPasswordFormData).unwrap();
          localStorage.setItem('resetPasswordAllowed', 'true');
          void navigate('/reset-password', { replace: true });
          break;
        }
        case 'reset-password': {
          await resetPassword(formData as ResetPasswordFormData).unwrap();
          localStorage.removeItem('resetPasswordAllowed');
          void navigate('/login', { replace: true });
          break;
        }
      }
    } catch (err) {
      console.error(`${type} failed:`, err);
    }
  };

  const getError = (): ApiError | null => {
    switch (type) {
      case 'login':
        return loginError as ApiError | null;
      case 'register':
        return registerError as ApiError | null;
      case 'forgot-password':
        return forgotError as ApiError | null;
      case 'reset-password':
        return resetError as ApiError | null;
      default:
        return null;
    }
  };

  const getIsLoading = (): boolean => {
    switch (type) {
      case 'login':
        return loginLoading;
      case 'register':
        return registerLoading;
      case 'forgot-password':
        return forgotLoading;
      case 'reset-password':
        return resetLoading;
      default:
        return false;
    }
  };

  const currentConfig = configLogin[type];

  return (
    <LoginLayout
      title={currentConfig.title}
      buttonText={currentConfig.buttonText}
      firstLink={currentConfig.firstLink}
      secondLink={'secondLink' in currentConfig ? currentConfig.secondLink : undefined}
      onSubmit={handleSubmit}
      error={getError()}
      isLoading={getIsLoading()}
    >
      {children({
        formData,
        onChange: handleChange,
        isLoading: getIsLoading(),
        error: getError(),
      })}
    </LoginLayout>
  );
};

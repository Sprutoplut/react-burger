import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, type ChangeEvent } from 'react';
import { Navigate } from 'react-router-dom';

type TResetPasswordPage = {
  formData: {
    password: string;
    token: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ResetPasswordPage = ({
  formData,
  onChange,
}: TResetPasswordPage): React.JSX.Element => {
  const isResetAllowed = localStorage.getItem('resetPasswordAllowed') === 'true';

  useEffect((): (() => void) => {
    return (): void => {
      if (localStorage.getItem('resetPasswordAllowed')) {
        localStorage.removeItem('resetPasswordAllowed');
      }
    };
  }, []);

  if (!isResetAllowed) {
    return <Navigate to="/forgot-password" replace />;
  }
  return (
    <>
      <PasswordInput
        name="password"
        placeholder="Введите новый пароль"
        value={formData.password}
        onChange={onChange}
      />

      <Input
        name="token"
        type="text"
        placeholder="Введите код из письма"
        value={formData.token}
        onChange={onChange}
      />
    </>
  );
};

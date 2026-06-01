import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';

import type { ChangeEvent } from 'react';

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

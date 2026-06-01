import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';

import type { ChangeEvent } from 'react';

type TLoginPage = {
  formData: {
    email: string;
    password: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const LoginPage = ({ formData, onChange }: TLoginPage): React.JSX.Element => {
  return (
    <>
      <Input
        name="email"
        type="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={onChange}
      />

      <PasswordInput
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={onChange}
      />
    </>
  );
};

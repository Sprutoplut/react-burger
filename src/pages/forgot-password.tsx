import { Input } from '@krgaa/react-developer-burger-ui-components';

import type { ChangeEvent } from 'react';

type TForgotPasswordPage = {
  formData: {
    email: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ForgotPasswordPage = ({
  formData,
  onChange,
}: TForgotPasswordPage): React.JSX.Element => {
  return (
    <Input
      name="email"
      type="email"
      placeholder="Укажите e-mail"
      value={formData.email}
      onChange={onChange}
    />
  );
};

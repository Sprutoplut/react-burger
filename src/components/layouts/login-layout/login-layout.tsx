import { Button } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { FormEvent } from 'react';

import styles from './login-layout.module.css';

export type TTextLink = {
  link: string;
  text: string;
  textbefore: string;
};

type ApiError = {
  data?: {
    message?: string;
  };
  message?: string;
};

export type TLoginLayout = {
  children: React.ReactNode;
  title: string;
  firstLink: TTextLink;
  secondLink?: TTextLink;
  onSubmit: (e: FormEvent) => void;
  buttonText: string;
  isLoading?: boolean;
  error?: ApiError | null;
};

const getErrorMessage = (error: ApiError): string => {
  if ('data' in error && error.data?.message) {
    return error.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'Ошибка';
};

export const LoginLayout = ({
  children,
  title,
  firstLink,
  secondLink,
  onSubmit,
  buttonText,
  isLoading,
  error,
}: TLoginLayout): React.JSX.Element => {
  return (
    <div className={`${styles.layout} mt-30`}>
      <h1 className="text text_type_main-medium mt-15 mb-6">{title}</h1>

      <form onSubmit={onSubmit}>
        {children}

        {error && <p>{getErrorMessage(error)}</p>}

        <Button htmlType="submit" disabled={isLoading}>
          {isLoading ? 'Загрузка...' : buttonText}
        </Button>
      </form>

      <div className={`${styles.links} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mb-4">
          {firstLink.textbefore}{' '}
          <Link className={styles.link} to={`/${firstLink.link}`}>
            {firstLink.text}
          </Link>
        </p>

        {secondLink && (
          <p className="text text_type_main-default text_color_inactive">
            {secondLink.textbefore}{' '}
            <Link className={styles.link} to={`/${secondLink.link}`}>
              {secondLink.text}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

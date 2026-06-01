import type { TValueMenuItems, TValueSubMenuItems } from './types';

export const type_ingredients = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
] as const;

export const API_URL = 'https://new-stellarburgers.education-services.ru/api' as const;

export const submenu: TValueSubMenuItems[] = [
  { text: 'Профиль', href: '/profile' },
  { text: 'История заказов', href: '/profile/orders' },
] as const;

export const menu: TValueMenuItems[] = [
  { text: 'Личный кабинет', href: '', iconType: 'profile', submenu: submenu },
  { text: 'Конструктор бургеров', href: '/', iconType: 'burger' },
  { text: 'Лента заказов', href: '/feed', iconType: 'orders' },
] as const;

type TLinkConfig = {
  link: string;
  text: string;
  textbefore: string;
};

type TAuthConfig = {
  title: string;
  buttonText: string;
  firstLink: TLinkConfig;
  secondLink?: TLinkConfig; // Делаем опциональным
};

export const configLogin: Record<string, TAuthConfig> = {
  login: {
    title: 'Вход',
    buttonText: 'Войти',
    firstLink: {
      link: 'register',
      text: 'Зарегистрироваться',
      textbefore: 'Вы — новый пользователь?',
    },
    secondLink: {
      link: 'forgot-password',
      text: 'Восстановить пароль',
      textbefore: 'Забыли пароль?',
    },
  },
  register: {
    title: 'Регистрация',
    buttonText: 'Зарегистрироваться',
    firstLink: {
      link: 'login',
      text: 'Войти',
      textbefore: 'Уже зарегистрированы?',
    },
  },
  'forgot-password': {
    title: 'Восстановление пароля',
    buttonText: 'Восстановить',
    firstLink: {
      link: 'login',
      text: 'Войти',
      textbefore: 'Вспомнили пароль?',
    },
  },
  'reset-password': {
    title: 'Восстановление пароля',
    buttonText: 'Сохранить',
    firstLink: {
      link: 'login',
      text: 'Войти',
      textbefore: 'Вспомнили пароль?',
    },
  },
};

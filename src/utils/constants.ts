import type { TValueMenuItems, TValueSubMenuItems } from './types';

export const type_ingredients = [
  { type: 'bun', title: 'Булки' },
  { type: 'sauce', title: 'Соусы' },
  { type: 'main', title: 'Начинки' },
] as const;

export const API_URL = 'https://new-stellarburgers.education-services.ru/api' as const;

export const submenu: TValueSubMenuItems[] = [
  { text: 'Профиль' },
  { text: 'История заказов' },
  { text: 'Выход' },
] as const;

export const menu: TValueMenuItems[] = [
  { text: 'Личный кабинет', iconType: 'profile', submenu: submenu },
  { text: 'Конструктор бургеров', iconType: 'burger' },
  { text: 'Лента заказов', iconType: 'orders' },
] as const;

import type { type_ingredients } from './constants';
import type { OrdersState } from '@/store/slices/ordersSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TIngredient = {
  _id: string;
  name: string;
  type: Ttype_ingredients | string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TIngredientNanoid = TIngredient & {
  nanoid: string;
};

export type TCart = {
  bun: TIngredient | null;
  main: TIngredientNanoid[];
};

export type TValueMenuItems = {
  text: string;
  iconType?: string;
  href: string;
  submenu?: TValueSubMenuItems[];
};

export type TValueSubMenuItems = {
  text: string;
  href: string;
};

export type Ttype_ingredients = (typeof type_ingredients)[number];

export type TIconTypes = 'secondary' | 'primary' | 'error' | 'success' | 'disabled';

type TDataItem = unknown;

export type TGenericState<T = TDataItem> = {
  data: T[];
  loading: boolean;
  error: string | null;
};

export type OrderResponse = {
  order: {
    number: number;
  };
  success: boolean;
  name: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type ResetPasswordFormData = {
  password: string;
  token: string;
};
export type WebSocketAction = {
  type: string;
  payload?: PayloadAction;
};

export type WebSocketConfig = {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  onMessage?: (data: OrdersState) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
};

export type WebSocketManager = Record<
  string,
  {
    ws: WebSocket | null;
    subscribers: number;
    reconnectAttempts: number;
    config: WebSocketConfig;
  }
>;

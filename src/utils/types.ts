import type { type_ingredients } from './constants';

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

export type TCartContext = {
  cart: TIngredient[];
  ingredients: TIngredient[];
  addToCart: (id: string) => void;
  openModal: (content: React.ReactNode, title: string) => void;
  closeModal: () => void;
  isModalOpen: boolean;
};

export type TValueMenuItems = {
  text: string;
  iconType?: string;
  href?: string;
  submenu?: TValueSubMenuItems[];
};

export type TValueSubMenuItems = {
  text: string;
  href?: string;
};

export type Ttype_ingredients = (typeof type_ingredients)[number];

export type TIconTypes = 'secondary' | 'primary' | 'error' | 'success' | 'disabled';

import type { RootState } from '../index';
import type { TCart, TIngredient, TIngredientNanoid } from '@/utils/types';

export const selectCart = (state: RootState): TCart => state.cart;

export const selectBun = (state: RootState): TIngredient | null => state.cart.bun;

export const selectMain = (state: RootState): TIngredientNanoid[] => state.cart.main;

export const findCartSelector = (
  id: string
): ((state: RootState) => { index: number }) => {
  return (state: RootState): { index: number } => ({
    index: state.cart.main.findIndex((item) => item.nanoid === id),
  });
};

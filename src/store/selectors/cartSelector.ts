import type { RootState } from '@/store';
import type { TIngredientNanoid } from '@/utils/types';

export const findCartSelector = (
  id: string
): ((state: RootState) => { index: number }) => {
  return (state: RootState): { index: number } => ({
    index: state.cart.main.findIndex((item: TIngredientNanoid) => item.nanoid === id),
  });
};

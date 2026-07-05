import type { RootState } from '@/store';
import type { TIngredient } from '@/utils/types';

export const selectIngredients = (state: RootState): TIngredient[] => {
  const queryResult = state.ingredientsApi?.queries['getIngredients(undefined)'];
  return (queryResult?.data as TIngredient[]) || [];
};

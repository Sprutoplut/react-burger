import type { RootState } from '../index';
import type { TIngredient } from '@/utils/types';

export const selectIngredients = (state: RootState): TIngredient[] => {
  const queryResult = state.ingredientsApi?.queries['getIngredients(undefined)'];
  return (queryResult?.data as TIngredient[]) || [];
};

import type { RootState } from '../index';

export const findCartSelector = (
  id: string
): ((state: RootState) => { index: number }) => {
  return (state: RootState): { index: number } => ({
    index: state.cart.main.findIndex((item) => item.nanoid === id),
  });
};

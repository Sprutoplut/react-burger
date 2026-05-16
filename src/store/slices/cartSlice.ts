import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { TCart, TIngredient, TIngredientNanoid } from '@/utils/types';

const initialState: TCart = {
  bun: null,
  main: [],
};

type MoveCardPayload = {
  id: string;
  to: number;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TIngredient>) => {
      const product = action.payload;
      if (!product) return;

      if (product.type === 'bun') state.bun = product;
      else {
        const productWithNanoid: TIngredientNanoid = {
          ...product,
          nanoid: nanoid(),
        };
        state.main.push(productWithNanoid);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const product = action.payload;
      if (!product) return;
      state.main = state.main.filter((item) => item.nanoid !== product);
    },
    moveCart: (state, action: PayloadAction<MoveCardPayload>) => {
      const { id, to } = action.payload;
      const fromIndex = state.main.findIndex((item) => item.nanoid === id);
      if (fromIndex === -1 || fromIndex === to) return;
      const [movedItem] = state.main.splice(fromIndex, 1);
      state.main.splice(to, 0, movedItem);
    },
  },
});

export const { addToCart, removeFromCart, moveCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { TCart, TIngredient, TIngredientNanoid } from '@/utils/types';

const initialState: TCart = {
  bun: null,
  main: [],
};

type AddToCartPayload = {
  ingredient: TIngredient;
  nanoid: string;
};

type MoveCardPayload = {
  id: string;
  to: number;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: {
      // Action creator с генерацией nanoid
      prepare: (ingredient: TIngredient) => {
        // Генерация ID происходит здесь, в action creator
        const cnanoid = nanoid();

        return {
          payload: {
            ingredient,
            nanoid: cnanoid,
          },
        };
      },
      reducer: (state, action: PayloadAction<AddToCartPayload>) => {
        const { ingredient, nanoid } = action.payload;

        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          const productWithNanoid: TIngredientNanoid = {
            ...ingredient,
            nanoid,
          };
          state.main.push(productWithNanoid);
        }
      },
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

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type ModalState = {
  isOpen: boolean;
  orderNum: number | undefined;
  ingredient: TIngredient | undefined;
  title: string;
};

const initialState: ModalState = {
  isOpen: false,
  orderNum: undefined,
  ingredient: undefined,
  title: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        orderNum?: number;
        ingredient?: TIngredient;
        title: string;
      }>
    ) => {
      state.isOpen = true;
      state.orderNum = action.payload.orderNum;
      state.ingredient = action.payload.ingredient;
      state.title = action.payload.title;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.orderNum = undefined;
      state.ingredient = undefined;
      state.title = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

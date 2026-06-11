import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  isOpen: boolean;
  type: 'order' | 'ingredient' | null;
  orderNum: number | null;
  title: string;
};

const initialState: ModalState = {
  isOpen: false,
  type: null,
  orderNum: null,
  title: '',
};

const loadState = (): ModalState => {
  try {
    const savedState = sessionStorage.getItem('modalState');
    if (savedState) {
      const parsedState = JSON.parse(savedState) as ModalState;
      return parsedState;
    }
  } catch (error) {
    console.error('Error loading modal state:', error);
  }
  return initialState;
};

const saveState = (state: ModalState): void => {
  try {
    sessionStorage.setItem('modalState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving modal state:', error);
  }
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: loadState(),
  reducers: {
    openOrderModal: (
      state,
      action: PayloadAction<{ orderNum: number; title?: string }>
    ) => {
      state.isOpen = true;
      state.type = 'order';
      state.orderNum = action.payload.orderNum;
      state.title = action.payload.title ?? '';
    },

    openIngredient: (state, action: PayloadAction<{ title?: string }>) => {
      state.isOpen = true;
      state.type = 'ingredient';
      state.orderNum = null;
      state.title = action.payload.title ?? '';
      saveState(state);
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.orderNum = null;
      state.title = '';
      saveState(state);
      sessionStorage.removeItem('modalState');
    },
  },
});

export const { openOrderModal, openIngredient, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

import { describe, it, expect } from 'vitest';

import cartReducer, {
  addToCart,
  removeFromCart,
  moveCart,
  clearCart,
  initialState,
} from './cartSlice';

import type { TIngredient } from '@/utils/types';

describe('cartSlice', () => {
  describe('Начальное состояние', () => {
    it('Должен вернуть начальное состояние', () => {
      expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('Добавление в корзину', () => {
    const mockIngredient: TIngredient = {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 50,
      image: 'image.jpg',
      image_mobile: 'image-mobile.jpg',
      image_large: 'image-large.jpg',
      __v: 0,
    };

    const mockMainIngredient: TIngredient = {
      ...mockIngredient,
      _id: '2',
      name: 'Соус',
      type: 'main',
      price: 100,
    };

    it('добавление булки', () => {
      const action = addToCart(mockIngredient);
      const state = cartReducer(initialState, action);

      expect(state.bun).toEqual(mockIngredient);
      expect(state.main).toHaveLength(0);
    });

    it('замена булки на новую', () => {
      const firstBun: TIngredient = {
        ...mockIngredient,
        _id: '1',
        name: 'Булка 1',
      };
      const secondBun: TIngredient = {
        ...mockIngredient,
        _id: '2',
        name: 'Булка 2',
      };

      let state = cartReducer(initialState, addToCart(firstBun));
      expect(state.bun?.name).toBe('Булка 1');

      state = cartReducer(state, addToCart(secondBun));
      expect(state.bun?.name).toBe('Булка 2');
      expect(state.main).toHaveLength(0);
    });

    it('проверка на nanoid', () => {
      const action = addToCart(mockMainIngredient);
      const state = cartReducer(initialState, action);

      expect(state.main).toHaveLength(1);
      expect(state.main[0]).toMatchObject({
        ...mockMainIngredient,
      });
      expect(state.main[0]).toHaveProperty('nanoid');
      expect(typeof state.main[0].nanoid).toBe('string');
      expect(state.main[0].nanoid).toMatch(/^[a-zA-Z0-9_-]{21}$/);
      expect(state.bun).toBeNull();
    });
  });

  describe('Удаление из корзины', () => {
    const mockMainIngredient: TIngredient = {
      _id: '1',
      name: 'Соус',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 100,
      image: 'image.jpg',
      image_mobile: 'image-mobile.jpg',
      image_large: 'image-large.jpg',
      __v: 0,
    };

    it('удаление по nanoid', () => {
      const addAction = addToCart(mockMainIngredient);
      let state = cartReducer(initialState, addAction);
      const nanoid = state.main[0].nanoid;

      state = cartReducer(state, removeFromCart(nanoid));
      expect(state.main).toHaveLength(0);
    });

    it('удаление если нет nanoid', () => {
      const addAction = addToCart(mockMainIngredient);
      let state = cartReducer(initialState, addAction);

      state = cartReducer(state, removeFromCart('non-existent-id'));
      expect(state.main).toHaveLength(1);
    });
  });

  describe('Перемещение в корзине', () => {
    const mockMainIngredient: TIngredient = {
      _id: '1',
      name: 'Соус',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 100,
      image: 'image.jpg',
      image_mobile: 'image-mobile.jpg',
      image_large: 'image-large.jpg',
      __v: 0,
    };

    it('перемещение с одной позиции на другую', () => {
      let state = { ...initialState };
      const ingredients = [
        { ...mockMainIngredient, _id: '1', name: 'Ингредиент 1' },
        { ...mockMainIngredient, _id: '2', name: 'Ингредиент 2' },
        { ...mockMainIngredient, _id: '3', name: 'Ингредиент 3' },
      ];

      ingredients.forEach((ing) => {
        state = cartReducer(state, addToCart(ing));
      });

      const idToMove = state.main[0].nanoid;
      const newState = cartReducer(state, moveCart({ id: idToMove, to: 2 }));

      expect(newState.main[2].nanoid).toBe(idToMove);
      expect(newState.main).toHaveLength(3);
    });
  });

  describe('Очистка корзины', () => {
    const mockIngredient: TIngredient = {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      price: 50,
      image: 'image.jpg',
      image_mobile: 'image-mobile.jpg',
      image_large: 'image-large.jpg',
      __v: 0,
    };

    const mockMainIngredient: TIngredient = {
      ...mockIngredient,
      _id: '2',
      name: 'Котлета',
      type: 'main',
    };

    it('очистка всей корзины', () => {
      let state = cartReducer(initialState, addToCart(mockIngredient));
      state = cartReducer(state, addToCart(mockMainIngredient));
      state = cartReducer(state, addToCart(mockMainIngredient));

      expect(state.bun).not.toBeNull();
      expect(state.main).toHaveLength(2);

      state = cartReducer(state, clearCart());

      expect(state.bun).toBeNull();
      expect(state.main).toHaveLength(0);
    });

    it('попытка очистки при пустой корзине', () => {
      const state = cartReducer(initialState, clearCart());
      expect(state).toEqual(initialState);
    });
  });
});

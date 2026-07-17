import { describe, it, expect, vi } from 'vitest';

import modalReducer, {
  openOrderModal,
  openIngredient,
  closeModal,
  initialState,
} from './modalSlice';

describe('modalSlice', () => {
  describe('Начальное состояние', () => {
    it('должен возвращать начальное состояние, если нет сохраненных данных', () => {
      vi.stubGlobal('sessionStorage', {
        getItem: vi.fn(() => null),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      });

      const state = modalReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
      expect(state.isOpen).toBe(false);
      expect(state.type).toBeNull();
      expect(state.orderNum).toBeNull();
      expect(state.title).toBe('');
    });
  });

  describe('openOrderModal - открытие модального окна заказа', () => {
    it('должен открывать модальное окно заказа с номером заказа', () => {
      const action = openOrderModal({ orderNum: 12345 });
      const state = modalReducer(initialState, action);

      expect(state.isOpen).toBe(true);
      expect(state.type).toBe('order');
      expect(state.orderNum).toBe(12345);
      expect(state.title).toBe('');
    });

    it('должен открывать модальное окно заказа с номером и заголовком', () => {
      const action = openOrderModal({
        orderNum: 67890,
        title: 'Заказ №67890',
      });
      const state = modalReducer(initialState, action);

      expect(state.isOpen).toBe(true);
      expect(state.type).toBe('order');
      expect(state.orderNum).toBe(67890);
      expect(state.title).toBe('Заказ №67890');
    });

    it('должен обновлять существующее состояние при открытии заказа', () => {
      const openIngredientAction = openIngredient({ title: 'Тестовый ингредиент' });
      let state = modalReducer(initialState, openIngredientAction);

      expect(state.isOpen).toBe(true);
      expect(state.type).toBe('ingredient');

      const openOrderAction = openOrderModal({ orderNum: 11111 });
      state = modalReducer(state, openOrderAction);

      expect(state.isOpen).toBe(true);
      expect(state.type).toBe('order');
      expect(state.orderNum).toBe(11111);
      expect(state.title).toBe('');
    });
  });

  describe('openIngredient - открытие модального окна ингредиента', () => {
    it('должен открывать модальное окно ингредиента без заголовка', () => {
      const action = openIngredient({});
      const state = modalReducer(initialState, action);

      expect(state.isOpen).toBe(true);
      expect(state.type).toBe('ingredient');
      expect(state.orderNum).toBeNull();
      expect(state.title).toBe('');
    });

    it('должен открывать модальное окно ингредиента с заголовком', () => {
      const action = openIngredient({ title: 'Булка' });
      const state = modalReducer(initialState, action);

      expect(state.isOpen).toBe(true);
      expect(state.type).toBe('ingredient');
      expect(state.orderNum).toBeNull();
      expect(state.title).toBe('Булка');
    });
  });

  describe('closeModal - закрытие модального окна', () => {
    it('должен закрывать модальное окно и сбрасывать состояние', () => {
      let state = modalReducer(initialState, openOrderModal({ orderNum: 12345 }));

      expect(state.isOpen).toBe(true);
      expect(state.type).toBe('order');
      expect(state.orderNum).toBe(12345);

      state = modalReducer(state, closeModal());

      expect(state.isOpen).toBe(false);
      expect(state.type).toBeNull();
      expect(state.orderNum).toBeNull();
      expect(state.title).toBe('');
    });
  });

  describe('Сценарии использования', () => {
    it('должен корректно обрабатывать последовательность открытия и закрытия', () => {
      let state = modalReducer(undefined, { type: 'unknown' });
      expect(state.isOpen).toBe(false);

      state = modalReducer(state, openOrderModal({ orderNum: 123 }));
      expect(state.isOpen).toBe(true);
      expect(state.type).toBe('order');
      expect(state.orderNum).toBe(123);

      state = modalReducer(state, closeModal());
      expect(state.isOpen).toBe(false);
      expect(state.type).toBeNull();
      expect(state.orderNum).toBeNull();

      state = modalReducer(state, openIngredient({ title: 'Булка' }));
      expect(state.isOpen).toBe(true);
      expect(state.type).toBe('ingredient');
      expect(state.title).toBe('Булка');
      expect(state.orderNum).toBeNull();

      state = modalReducer(state, closeModal());
      expect(state.isOpen).toBe(false);
      expect(state.type).toBeNull();
      expect(state.title).toBe('');
    });
  });
});

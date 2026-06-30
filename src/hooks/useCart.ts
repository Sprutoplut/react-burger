import { useCreateOrderMutation } from '@/store/api/orderApi';
import { clearCart } from '@/store/slices/cartSlice';
import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from './useRedux';

import type { TIngredient, TIngredientNanoid } from '@/utils/types';

type BurgerConstructorData = {
  bun: TIngredient | null;
  main: TIngredientNanoid[];
  total: number;
  getOrderNumber: () => Promise<number | null>;
  error: unknown;
};

export const useCart = (): BurgerConstructorData => {
  const [createOrder, { error }] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const bun = useAppSelector((state) => state.cart.bun);
  const main = useAppSelector((state) => state.cart.main);
  const total = useMemo(() => {
    let sum = 0;
    if (bun) sum += bun.price * 2;
    sum += main.reduce((acc, item) => acc + item.price, 0);
    return sum;
  }, [bun, main]);
  const getOrderNumber = useCallback((): Promise<number | null> => {
    if (main.length !== 0 && bun) {
      const ingredientIds = [bun._id, ...main.map((item) => item._id), bun._id];

      return createOrder({ ingredients: ingredientIds })
        .unwrap()
        .then((response) => {
          dispatch(clearCart());
          return response.order.number;
        })
        .catch((err) => {
          console.error('Ошибка при оформлении заказа:', err);
          return null;
        });
    }
    return Promise.resolve(null);
  }, [bun, main, createOrder, dispatch]);

  return {
    bun,
    main,
    total,
    getOrderNumber,
    error,
  };
};

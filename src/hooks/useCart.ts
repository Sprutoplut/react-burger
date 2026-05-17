import { useCreateOrderMutation } from '@/store/api/orderApi';
import { useMemo } from 'react';

import { useAppSelector } from './useRedux';

import type { TIngredient, TIngredientNanoid } from '@/utils/types';

type BurgerConstructorData = {
  bun: TIngredient | null;
  main: TIngredientNanoid[];
  total: number;
  getOrderNumber: () => Promise<number | null>;
  isLoading: boolean;
  error: unknown;
};

export const useCart = (): BurgerConstructorData => {
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const bun = useAppSelector((state) => state.cart.bun);
  const main = useAppSelector((state) => state.cart.main);
  const total = useMemo(() => {
    let sum = 0;
    if (bun) sum += bun.price * 2;
    sum += main.reduce((acc, item) => acc + item.price, 0);
    return sum;
  }, [bun, main]);
  const getOrderNumber = async (): Promise<number | null> => {
    if (main.length !== 0 && bun) {
      try {
        const ingredientIds = [bun._id, ...main.map((item) => item._id), bun._id];

        const response = await createOrder({ ingredients: ingredientIds }).unwrap();

        return response.order.number;
      } catch (err) {
        console.error('Ошибка при оформлении заказа:', err);
        return null;
      }
    } else return null;
  };

  return {
    bun,
    main,
    total,
    getOrderNumber,
    isLoading,
    error,
  };
};

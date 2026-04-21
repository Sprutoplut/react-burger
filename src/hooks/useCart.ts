import { CartContext } from '@/components/contexts/cart/cart';
import { useContext } from 'react';

import type { TCartContext } from '@/utils/types';

export const useCart = (): TCartContext => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('Ошибка');
  }
  return context;
};

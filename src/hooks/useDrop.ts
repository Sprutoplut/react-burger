import { addToCart } from '@/store/slices/cartSlice';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/store';
import type { TIngredient } from '@/utils/types';

type DropResult = {
  dropRef: (node: HTMLElement | null) => void;
  isOver: boolean;
  canDrop: boolean;
};

export const useDropIngredient = (): DropResult => {
  const dispatch = useDispatch<AppDispatch>();

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'INGREDIENT',
    drop: (item: TIngredient) => {
      if (item.type !== 'bun') {
        dispatch(addToCart(item));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return { dropRef, isOver, canDrop };
};

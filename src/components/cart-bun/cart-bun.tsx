import { addToCart } from '@/store/slices/cartSlice';
import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/store';
import type { TIngredient } from '@/utils/types';

import styles from './cart-bun.module.css';

export type TCartBun = {
  ingredient: TIngredient | null;
  direction: 'top' | 'bottom' | undefined;
};

export const CartBun = ({ ingredient, direction }: TCartBun): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const dragRef = useRef<HTMLLIElement>(null);
  const [, dropBun] = useDrop({
    accept: 'INGREDIENT',
    drop: (item: TIngredient) => {
      if (item.type === 'bun') {
        dispatch(addToCart(item));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  dropBun(dragRef);
  return (
    <li className={`${styles.header_cart_list} pl-8`} ref={dragRef}>
      <ConstructorElement
        isLocked
        price={ingredient !== null ? ingredient.price : 0}
        text={
          (ingredient !== null ? ingredient.name : 'Перетяните булочку сюда') +
          ' (' +
          (direction === 'top' ? 'верх' : 'низ') +
          ')'
        }
        thumbnail={ingredient !== null ? ingredient.image_mobile : 'loading.svg'}
        type={direction}
      />
    </li>
  );
};

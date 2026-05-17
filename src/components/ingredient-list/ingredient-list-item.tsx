import { useAppDispatch } from '@/hooks/useRedux';
import { addToCart } from '@/store/slices/cartSlice';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

import { IngredientCard } from '../ingredient-card/ingredient-card';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-list.module.css';

type TIngredientListItem = {
  ingredient: TIngredient;
  screenType: string;
  cart: Record<string, number>;
};

export const IngredientListItem = ({
  ingredient,
  screenType,
  cart,
}: TIngredientListItem): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const [, drag] = useDrag({
    type: 'INGREDIENT',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref);
  return (
    <li ref={ref} className={`${styles.card} ml-4 mr-4 mb-8`}>
      <IngredientCard
        ingredient={ingredient}
        count={cart[ingredient._id] || 0}
      ></IngredientCard>
      {screenType === 'mobile' && (
        <Button
          onClick={() => dispatch(addToCart(ingredient))}
          size="medium"
          type="secondary"
          htmlType={'button'}
        >
          Добавить
        </Button>
      )}
    </li>
  );
};

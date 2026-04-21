import { useCart } from '@/hooks/useCart';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-card.module.css';

type TIngredientCard = {
  ingredient: TIngredient;
  count: number;
};

export const IngredientCard = ({
  ingredient,
  count,
}: TIngredientCard): React.JSX.Element => {
  const { openModal } = useCart();
  return (
    <div onClick={() => openModal(ingredient, null)}>
      <Counter count={count} size="default" />
      <img src={ingredient.image} alt="" draggable="false" />
      <div className={`${styles.price} pb-1 pt-1`}>
        <p className="text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
};

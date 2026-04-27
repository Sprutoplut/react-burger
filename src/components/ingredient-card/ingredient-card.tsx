import { useHover } from '@/hooks/useHover';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-card.module.css';

export type TIngredientCard = {
  ingredient: TIngredient;
  count: number;
  openModal: (ingredient: TIngredient | null, orderNum: number | null) => void;
};

export const IngredientCard = ({
  ingredient,
  count,
  openModal,
}: TIngredientCard): React.JSX.Element => {
  const { type, onMouseEnter, onMouseLeave } = useHover();
  return (
    <div
      className={styles.card_container}
      onClick={() => openModal(ingredient, null)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Counter count={count} size="default" />
      <img src={ingredient.image} alt="" draggable="false" />
      <div className={`${styles.price} pb-1 pt-1`}>
        <p className="text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type={type} />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
};

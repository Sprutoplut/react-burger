import { useHover } from '@/hooks/useHover';
import { useModal } from '@/hooks/useModal';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { IngredientDetails } from '../modal-window/ingredient-details/ingredient-details';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-card.module.css';

export type TIngredientCard = {
  ingredient: TIngredient;
  count: number;
};

export const IngredientCard = ({
  ingredient,
  count,
}: TIngredientCard): React.JSX.Element => {
  const { type, onMouseEnter, onMouseLeave } = useHover();
  const { openModal } = useModal();
  const { screenType } = useWindowSize();
  return (
    <div
      className={styles.card_container}
      onClick={() =>
        openModal(
          <IngredientDetails ingredient={ingredient} />,
          screenType === 'desktop' ? 'Детали ингредиента' : ''
        )
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Counter count={count} size="default" />
      <img src={ingredient.image} alt={ingredient.name} draggable="false" />
      <div className={`${styles.price} pb-1 pt-1`}>
        <p className="text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type={type} />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
};

import { useHover } from '@/hooks/useHover';
import { useAppDispatch } from '@/hooks/useRedux';
import { openIngredient } from '@/store/slices/modalSlice';
import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const location = useLocation();
  const { type, onMouseEnter, onMouseLeave } = useHover();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenModal = (): void => {
    void navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location, ingredient: ingredient },
    });
    dispatch(openIngredient({ title: 'Детали ингредиента' }));
  };

  return (
    <div
      className={styles.card_container}
      onClick={handleOpenModal}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {count >= 1 && <Counter count={count} size="default" />}
      <img src={ingredient.image} alt={ingredient.name} draggable="false" />
      <div className={`${styles.price} pb-1 pt-1`}>
        <p className="text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type={type} />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
};

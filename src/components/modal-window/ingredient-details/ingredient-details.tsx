import { useAppSelector } from '@/hooks/useRedux';
import { useWindowSize } from '@/hooks/useWindowSize';
import { selectIngredients } from '@/store/selectors/ingredientsSelectors';
import { useLocation, useParams } from 'react-router-dom';

import { IngredientElement } from '../ingredient-element/ingredient-element';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

type LocationState = {
  ingredient?: TIngredient;
};

export const IngredientDetails = (): React.JSX.Element | null => {
  const ingredients = useAppSelector(selectIngredients);
  const location = useLocation();
  const { id } = useParams();
  const locationState = location.state as LocationState;

  const ingredient: TIngredient | undefined =
    ingredients?.find((ing) => ing._id === id) ?? locationState?.ingredient;

  const { screenType } = useWindowSize();

  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.details}>
      <img src={ingredient.image_large} alt={ingredient.name} className="mb-4" />
      <h2 className="text text_type_main-medium mb-8">{ingredient.name}</h2>
      {screenType === 'mobile' && (
        <p className="text text_type_main-default mb-10">Нет описания</p>
      )}
      <div className={`${styles.info} mb-5`}>
        <IngredientElement text="Калории,ккал" value={ingredient.calories} />
        <IngredientElement text="Белки, г" value={ingredient.proteins} />
        <IngredientElement text="Жиры, г" value={ingredient.fat} />
        <IngredientElement text="Углеводы, г" value={ingredient.carbohydrates} />
      </div>
    </div>
  );
};

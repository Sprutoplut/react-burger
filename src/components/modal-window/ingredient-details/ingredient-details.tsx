import { useWindowSize } from '@/hooks/useWindowSize';

import { IngredientElement } from '../ingredient-element/ingredient-element';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

type TIngredientDetails = {
  ingredient: TIngredient;
};

export const IngredientDetails = ({
  ingredient,
}: TIngredientDetails): React.JSX.Element | null => {
  const { screenType } = useWindowSize();
  return (
    <div className={styles.details}>
      <img src={ingredient.image_large} alt={ingredient.name} className="mb-4" />
      <h2 className="text text_type_main-medium mb-8">{ingredient.name}</h2>
      {screenType === 'mobile' && (
        <p className="text text_type_main-default mb-10">Нет описания</p>
      )}
      <div className={`${styles.info} mb-5`}>
        <IngredientElement
          text="Калории,ккал"
          value={ingredient.calories}
        ></IngredientElement>
        <IngredientElement
          text="Белки, г"
          value={ingredient.proteins}
        ></IngredientElement>
        <IngredientElement text="Жиры, г" value={ingredient.fat}></IngredientElement>
        <IngredientElement
          text="Углеводы, г"
          value={ingredient.carbohydrates}
        ></IngredientElement>
      </div>
    </div>
  );
};

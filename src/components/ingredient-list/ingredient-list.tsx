import { useAppSelector } from '@/hooks/useRedux';
import { useWindowSize } from '@/hooks/useWindowSize';
import { selectIngredients } from '@/store/selectors/ingredientsSelectors';
import { Fragment } from 'react/jsx-runtime';

import { IngredientListItem } from './ingredient-list-item';

import type { Ttype_ingredients } from '@/utils/types';

import styles from './ingredient-list.module.css';

type TIngredientList = {
  type_ingredient: Ttype_ingredients;
  cart: Record<string, number>;
};

export const IngredientList = ({
  type_ingredient,
  cart,
}: TIngredientList): React.JSX.Element => {
  const ingredients = useAppSelector(selectIngredients);

  const { screenType } = useWindowSize();
  return (
    <Fragment>
      <h2 className="text text_type_main-medium">{type_ingredient.title}</h2>
      <ul className={`${styles.ingredient_list} pl-4 pb-10 pt-6 pr-4`}>
        {ingredients
          .filter((ingredient) => ingredient.type === type_ingredient.type)
          .map((ingredient) => (
            <IngredientListItem
              key={ingredient._id}
              ingredient={ingredient}
              screenType={screenType}
              cart={cart}
            />
          ))}
      </ul>
    </Fragment>
  );
};

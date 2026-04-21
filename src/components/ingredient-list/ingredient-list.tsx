import { useCart } from '@/hooks/useCart.ts';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { Fragment } from 'react/jsx-runtime';

import { IngredientCard } from '../ingredient-card/ingredient-card';

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
  const { ingredients, addToCart } = useCart();
  const { screenType } = useWindowSize();
  return (
    <Fragment>
      <h2 className="text text_type_main-medium">{type_ingredient.title}</h2>
      <ul className={`${styles.ingredient_list} pl-4 pb-10 pt-6 pr-4`}>
        {ingredients
          .filter((ingredient) => ingredient.type === type_ingredient.type)
          .map((ingredient) => (
            <li
              key={ingredient._id}
              className={`${styles.card} ml-4 mr-4 mb-8`}
              draggable="true"
            >
              <IngredientCard
                ingredient={ingredient}
                count={cart[ingredient._id] || 0}
              ></IngredientCard>
              {screenType === 'mobile' && (
                <Button
                  onClick={() => addToCart(ingredient._id)}
                  size="medium"
                  type="secondary"
                  htmlType={'button'}
                >
                  Добавить
                </Button>
              )}
            </li>
          ))}
      </ul>
    </Fragment>
  );
};

import { Error } from '@/components/error/error';
import { Loader } from '@/components/loader/loader';
import { IngredientDetails } from '@/components/modal-window/ingredient-details/ingredient-details';
import { useGetIngredientsQuery } from '@/store/api/ingredientsApi';

import styles from './pages.module.css';

export const IngredientPage = (): React.JSX.Element => {
  const { error, isLoading } = useGetIngredientsQuery();

  if (error) {
    return <Error text="Ошибка получения данных" />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`${styles.ingredient_page} pt-30`}>
      <h1 className="text text_type_main-large pb-10">Детали ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};

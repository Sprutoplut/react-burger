import { useAppSelector } from '@/hooks/useRedux';
import { useGetOrderQuery } from '@/store/api/ordersfeedApi';
import { selectIngredients } from '@/store/selectors/ingredientsSelectors';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Loader } from '../loader/loader';
import { OrderItem } from '../order-item/order-item';

import styles from './order-detail.module.css';

type LocationState = {
  background?: Location;
};

export const OrderDetail = (): React.JSX.Element => {
  const location = useLocation();
  const background = (location.state as LocationState)?.background;
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOrderQuery(id!, {
    skip: !id,
  });
  console.log(id);
  console.log(data);
  const ingredients = useAppSelector(selectIngredients);
  const ingredientsMap = useMemo(() => {
    return ingredients.reduce(
      (acc, ing) => {
        acc[ing._id] = ing;
        return acc;
      },
      {} as Record<string, (typeof ingredients)[0]>
    );
  }, [ingredients]);
  const firstName = useMemo(() => {
    if (data) {
      if (data.ingredients.length === 0) return 'Без названия';
      const firstIng = ingredientsMap[data.ingredients[0]];
      return firstIng?.name;
    }
    return 'Без названия';
  }, [data, ingredientsMap]);
  const ingredientCounts = useMemo(() => {
    if (!data) return {};

    return data.ingredients.reduce(
      (acc, ingredientId) => {
        acc[ingredientId] = (acc[ingredientId] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [data]);
  const orderIngredients = useMemo(() => {
    if (!data) return [];

    const uniqueIngredientIds = [...new Set(data.ingredients)];

    return uniqueIngredientIds.map((id) => {
      const ingredient = ingredientsMap[id];
      const count = ingredientCounts[id] || 0;
      const price = ingredient?.price || 0;

      return {
        ingredient,
        count,
        total: count * price,
      };
    });
  }, [data, ingredientsMap, ingredientCounts]);
  const totalPrice = useMemo(() => {
    return orderIngredients.reduce((sum, item) => sum + item.total, 0);
  }, [orderIngredients]);
  if (isLoading) <Loader />;
  return (
    <div className={`${styles.detail_container} mt-10`}>
      {!background && (
        <p className={`text text_type_digits-default ${styles.number} mt-20 pb-10`}>
          #{data?.number}
        </p>
      )}
      <p className="text text_type_main-medium">{firstName}</p>
      <p
        className={`text text_type_main-default mt-3 
        ${data?.status === 'done' ? styles.done : styles.wait}`}
      >
        {data?.status === 'done' && 'Выполнен'}
        {data?.status === 'pending' && 'В работе'}
        {data?.status === 'created' && 'Создан'}
      </p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={`${styles.detail_structure} mt-6`}>
        {orderIngredients.map((item) => (
          <OrderItem
            key={item.ingredient?._id}
            ingredient={item.ingredient}
            count={item.count}
          />
        ))}
      </div>
      <div className={`${styles.detail_footer} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          {data?.createdAt}
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

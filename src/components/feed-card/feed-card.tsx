import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectIngredients } from '@/store/selectors/ingredientsSelectors';
import { openIngredient } from '@/store/slices/modalSlice';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ImgWithCircle } from '../img-with-circle/img-with-circle';

import type { Order } from '@/store/slices/ordersSlice';

import styles from './feed-card.module.css';

type TFeedCard = {
  order: Order;
};

export const FeedCard = ({ order }: TFeedCard): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const sum = useMemo(() => {
    return order.ingredients.reduce((total, ingredientId) => {
      const ingredient = ingredientsMap[ingredientId];
      if (!ingredient) return total;
      return total + ingredient.price;
    }, 0);
  }, [order.ingredients, ingredientsMap]);

  const firstName = useMemo(() => {
    if (order.ingredients.length === 0) return 'Без названия';
    const firstIng = ingredientsMap[order.ingredients[0]];
    return firstIng?.name || 'Без названия';
  }, [order.ingredients, ingredientsMap]);

  const displayIngredients = useMemo(() => {
    const maxDisplay = 5;
    const displayIds = order.ingredients.slice(0, maxDisplay);
    const remaining = order.ingredients.length - maxDisplay;

    return {
      display: displayIds.map((id) => ingredientsMap[id]).filter(Boolean),
      remaining,
    };
  }, [order.ingredients, ingredientsMap]);

  const handleOpenModal = (orderId: string): void => {
    void navigate(`/feed/${orderId}`, {
      state: { background: location, feed: true },
    });
    dispatch(openIngredient({ title: '#' + order.number.toString() }));
  };

  return (
    <div
      className={`${styles.feed_card} p-6`}
      onClick={() => handleOpenModal(order._id)}
    >
      <div className={`mb-6 ${styles.card_row}`}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {order.createdAt}
        </p>
      </div>

      <div className={`mb-6 ${styles.card_row}`}>
        <p className="text text_type_main-medium">{firstName}</p>
      </div>

      <div className={styles.card_row}>
        <div className={styles.card_ingredient}>
          {displayIngredients.display.map(
            (ingredient, index) =>
              ingredient && (
                <ImgWithCircle
                  last={false}
                  img={ingredient.image_mobile}
                  alt={ingredient.name}
                  key={index}
                />
              )
          )}
          {displayIngredients.remaining > 0 && (
            <ImgWithCircle
              last={true}
              img={
                displayIngredients.display[displayIngredients.display.length - 1]
                  ?.image_mobile
              }
              remaining={displayIngredients.remaining}
            />
          )}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{sum}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

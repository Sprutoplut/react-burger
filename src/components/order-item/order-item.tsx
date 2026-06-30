import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import { ImgWithCircle } from '../img-with-circle/img-with-circle';

import type { TIngredient } from '@/utils/types';

import styles from './order-item.module.css';

type TOrderItem = {
  ingredient: TIngredient;
  count: number;
};

export const OrderItem = ({ ingredient, count }: TOrderItem): React.JSX.Element => {
  return (
    <div className={`${styles.order_item} pr-6`}>
      <div>
        <ImgWithCircle
          last={false}
          img={ingredient.image_mobile}
          alt={ingredient.name}
        />
      </div>
      <p className={`text text_type_main-default ${styles.name} ml-8`}>
        {ingredient.name}
      </p>
      <div className={styles.price}>
        <p className="text text_type_digits-default">
          {count} x {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

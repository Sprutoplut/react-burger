import { useCart } from '@/hooks/useCart.ts';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element | null => {
  const { orderNum } = useCart();
  return (
    <div className={`${styles.content} pt-4 pb-20`}>
      <h1 className="text text_type_digits-large mb-8">{orderNum}</h1>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src="done.png" className="mb-15" alt="" />
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

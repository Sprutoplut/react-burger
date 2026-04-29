import styles from './order-details.module.css';

type TOrderDetails = {
  orderNum: number;
};

export const OrderDetails = ({ orderNum }: TOrderDetails): React.JSX.Element | null => {
  return (
    <div className={`${styles.content} pt-4 pb-20`}>
      <h1 className="text text_type_digits-large mb-8">{orderNum}</h1>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src="done.png" alt="Заказ принят" className="mb-15" />
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

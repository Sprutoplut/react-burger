import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { openOrderModal } from '@/store/slices/modalSlice';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { Error } from '../../error/error';

import styles from './footer.module.css';

type TFooter = {
  onClick: () => void;
  active: boolean;
};

export const Footer = ({ onClick, active }: TFooter): React.JSX.Element => {
  const bun = useAppSelector((state) => state.cart.bun);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const dispatch = useAppDispatch();
  const { total, getOrderNumber, error } = useCart();
  const handleOpenModal = async (): Promise<void> => {
    if (!active) {
      onClick();
    } else {
      if (!isAuthenticated && !isLoading) {
        void navigate('/login', {
          state: { from: location.pathname },
          replace: true,
        });
        return;
      }

      const orderNumber = await getOrderNumber();
      if (orderNumber !== null) {
        dispatch(
          openOrderModal({
            orderNum: orderNumber,
            title: 'Заказ оформлен',
          })
        );
      }
    }
  };

  if (error) {
    return <Error text="Ошибка получения данных" />;
  }

  return (
    <footer className={`${styles.footer} pr-2 pl-2 pb-4 pt-4`}>
      <div className={styles.price_total_number}>
        <p className="text_type_digits-default">{total}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        onClick={() => {
          void handleOpenModal();
        }}
        disabled={bun === null && active}
        size="medium"
        type="primary"
        htmlType={'button'}
      >
        {active ? 'Оформить заказ' : 'Смотреть заказ'}
      </Button>
    </footer>
  );
};

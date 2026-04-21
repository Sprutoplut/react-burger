import { useCart } from '@/hooks/useCart';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import styles from './footer.module.css';

type TFooter = {
  onClick: () => void;
  active: boolean;
};

export const Footer = ({ onClick, active }: TFooter): React.JSX.Element => {
  const { cart, openModal } = useCart();
  const total = useMemo(() => {
    const ttotal = cart.reduce((sum, item) => {
      const multiplier = item.type === 'bun' ? 2 : 1;
      return sum + item.price * multiplier;
    }, 0);
    return ttotal;
  }, [cart]);
  const handleClick = (): void => {
    if (!active) {
      onClick();
    } else {
      openModal(null, 123);
    }
  };
  return (
    <footer className={`${styles.footer} pr-2 pl-2 pb-4 pt-4`}>
      <div className={styles.price_total_number}>
        <p className="text_type_digits-default">{total}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button onClick={handleClick} size="medium" type="primary" htmlType={'button'}>
        {active ? 'Оформить заказ' : 'Смотреть заказ'}
      </Button>
    </footer>
  );
};

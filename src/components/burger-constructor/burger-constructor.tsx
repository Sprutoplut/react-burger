import { useCart } from '@/hooks/useCart';
import { useModal } from '@/hooks/useModal';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import { BetweenBun } from '../between-bun/between-bun';
import { CartBun } from '../cart-bun/cart-bun';
import { ListConstructor } from '../mobile/list-constructor/list-constructor';
import { MobileHead } from '../mobile/mobile-head/mobile-head';
import { OrderDetails } from '../modal-window/order-details/order-details';

import styles from './burger-constructor.module.css';

type TBurgerConstructor = {
  onClose?: () => void;
};

export const BurgerConstructor = ({
  onClose,
}: TBurgerConstructor): React.JSX.Element => {
  const { cart } = useCart();
  const { openModal } = useModal();
  const { screenType } = useWindowSize();
  const { bun, main, total } = useMemo(() => {
    const firstBun = cart.find((item) => item.type === 'bun');
    const tmain = cart.filter((item) => item.type !== 'bun');
    const ttotal = cart.reduce((sum, item) => {
      const multiplier = item.type === 'bun' ? 2 : 1;
      return sum + item.price * multiplier;
    }, 0);
    return { bun: firstBun, main: tmain, total: ttotal };
  }, [cart]);

  return (
    <section className={`${styles.burger_constructor} pl-4`}>
      {screenType === 'mobile' && (
        <>
          <MobileHead title="Заказ" onClose={onClose as () => void} />
          <ListConstructor bun={bun!} main={main} />
        </>
      )}
      {screenType === 'desktop' && (
        <>
          <ul className={`${styles.cart_list_main} pb-10`}>
            <CartBun ingredient={bun} direction="top"></CartBun>
            <ul className={`${styles.cart_list} pl-8 pr-2 `}>
              {main.map((main, index) => (
                <li
                  key={`${main._id}-${index}`}
                  className={`${styles.element_card_list} `}
                >
                  <BetweenBun ingredient={main}></BetweenBun>
                </li>
              ))}
            </ul>
            <CartBun ingredient={bun} direction="bottom"></CartBun>
          </ul>
          <div className={`${styles.price_total} pl-8 pr-4`}>
            <div className={styles.price_total_number}>
              <p className="text_type_digits-medium">{total}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button
              onClick={() => openModal(<OrderDetails orderNum={123} />, '')}
              size="large"
              type="primary"
              htmlType={'button'}
            >
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

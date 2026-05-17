import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrop } from 'react-dnd';

import { BetweenBun } from '../between-bun/between-bun';
import { BetweenBunParent } from '../between-bun/between-bun-parent';
import { CartBun } from '../cart-bun/cart-bun';

import type { TIngredient, TIngredientNanoid } from '@/utils/types';

import styles from './burger-constructor.module.css';

type TDesktopBurgerConstructor = {
  bun: TIngredient | null;
  main: TIngredientNanoid[];
  total: number;
  draggedIngredientId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onOpenModal: () => void;
  onDropIngredient: (item: TIngredientNanoid) => void;
};

export const DesktopBurgerConstructor = ({
  bun,
  main,
  total,
  draggedIngredientId,
  onDragStart,
  onDragEnd,
  onOpenModal,
  onDropIngredient,
}: TDesktopBurgerConstructor): React.JSX.Element => {
  const dropRef = useRef<HTMLUListElement>(null);
  const [, dropMain] = useDrop({
    accept: 'INGREDIENT',
    drop: (item: TIngredientNanoid) => {
      if (item.type !== 'bun') {
        onDropIngredient(item);
      }
    },
  });
  dropMain(dropRef);
  return (
    <>
      <ul className={`${styles.cart_list_main} pb-10`}>
        <CartBun ingredient={bun} direction="top" />
        <ul className={`${styles.cart_list} pl-8 pr-2`} ref={dropRef}>
          {main.length !== 0 ? (
            main.map((mainItem) => (
              <BetweenBunParent
                key={mainItem.nanoid}
                ingredient={mainItem}
                isDraggingGlobal={draggedIngredientId === mainItem.nanoid}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
              />
            ))
          ) : (
            <li key="emptymain" className={styles.element_card_list}>
              <BetweenBun />
            </li>
          )}
        </ul>
        <CartBun ingredient={bun} direction="bottom" />
      </ul>
      <div className={`${styles.price_total} pl-8 pr-4`}>
        <div className={styles.price_total_number}>
          <p className="text_type_digits-medium">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={onOpenModal}
          disabled={bun === null}
          size="large"
          type="primary"
          htmlType="button"
        >
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

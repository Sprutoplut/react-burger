import { useCart } from '@/hooks/useCart';
import { useDragState } from '@/hooks/useDrag';
import { useAppDispatch } from '@/hooks/useRedux';
import { useWindowSize } from '@/hooks/useWindowSize';
import { addToCart } from '@/store/slices/cartSlice';
import { openOrderModal } from '@/store/slices/modalSlice';
import { useCallback } from 'react';

import { BetweenBunLayer } from '../drag-style/between-bun';
import { ListItemLayer } from '../drag-style/list-item';
import { Error } from '../error/error';
import { DesktopBurgerConstructor } from './burger-constructor-desktop';
import { MobileBurgerConstructor } from './burger-constructor-mobile';

import type { TIngredientNanoid } from '@/utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructor = {
  onClose?: () => void;
};

export const BurgerConstructor = ({
  onClose,
}: TBurgerConstructor): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { bun, main, total, getOrderNumber, error } = useCart();
  const { screenType } = useWindowSize();
  const { draggedIngredientId, handleDragStart, handleDragEnd } = useDragState();

  const handleOpenModal = async (): Promise<void> => {
    const orderNumber = await getOrderNumber();
    if (orderNumber !== null) {
      dispatch(
        openOrderModal({
          orderNum: orderNumber,
          title: '',
        })
      );
    }
  };

  const handleDropIngredient = useCallback(
    (item: TIngredientNanoid): void => {
      if (item.type !== 'bun') {
        dispatch(addToCart(item));
      }
    },
    [dispatch]
  );

  if (error) return <Error text="Ошибка получения данных" />;

  return (
    <section className={`${styles.burger_constructor} pl-4`}>
      {screenType === 'desktop' ? <BetweenBunLayer /> : <ListItemLayer />}
      {screenType === 'mobile' && (
        <MobileBurgerConstructor
          bun={bun!}
          main={main}
          onClose={onClose}
          draggedIngredientId={draggedIngredientId}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDropIngredient={handleDropIngredient}
        />
      )}
      {screenType === 'desktop' && (
        <DesktopBurgerConstructor
          bun={bun}
          main={main}
          total={total}
          draggedIngredientId={draggedIngredientId}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onOpenModal={() => {
            void handleOpenModal();
          }}
          onDropIngredient={handleDropIngredient}
        />
      )}
    </section>
  );
};

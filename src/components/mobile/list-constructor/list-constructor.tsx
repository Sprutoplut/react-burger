import { useAppDispatch } from '@/hooks/useRedux';
import { removeFromCart } from '@/store/slices/cartSlice';
import { useRef, useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';

import { ListItemBun } from '../list-item/list-item-bun';
import { ListItemEmpty } from '../list-item/list-item-empty';
import { ListItemMain } from '../list-item/list-item-main';

import type { TIngredient, TIngredientNanoid } from '@/utils/types';

import styles from './list-constructor.module.css';

type TListConstructor = {
  bun: TIngredient;
  main: TIngredientNanoid[];
  draggedIngredientId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDropIngredient: (item: TIngredientNanoid) => void;
};

export const ListConstructor = ({
  bun,
  main,
  draggedIngredientId,
  onDragStart,
  onDragEnd,
  onDropIngredient,
}: TListConstructor): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const dropRef = useRef<HTMLUListElement>(null);

  const [openSwipeId, setOpenSwipeId] = useState<string | null>(null);

  const handleDeleteIngredient = useCallback(
    (nanoid: string) => {
      dispatch(removeFromCart(nanoid));
    },
    [dispatch]
  );

  const handleSwipeOpen = useCallback((nanoid: string) => {
    setOpenSwipeId(nanoid);
  }, []);

  const handleSwipeClose = useCallback(() => {
    setOpenSwipeId(null);
  }, []);

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
    <ul className={`${styles.list} pb-10 pr-2`} ref={dropRef}>
      {bun !== null ? <ListItemBun ingredient={bun} /> : <ListItemEmpty isBun={true} />}

      {main.length !== 0 ? (
        main.map((mainItem, index) => (
          <ListItemMain
            key={`${mainItem._id}-${index}`}
            ingredient={mainItem}
            isDraggingGlobal={draggedIngredientId === mainItem.nanoid}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            isSwipeOpen={openSwipeId === mainItem.nanoid}
            onSwipeOpen={() => handleSwipeOpen(mainItem.nanoid)}
            onSwipeClose={handleSwipeClose}
            onDelete={() => handleDeleteIngredient(mainItem.nanoid)}
          />
        ))
      ) : (
        <ListItemEmpty isBun={false} />
      )}

      {bun !== null ? <ListItemBun ingredient={bun} /> : <ListItemEmpty isBun={true} />}
    </ul>
  );
};

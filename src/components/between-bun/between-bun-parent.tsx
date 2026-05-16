import { findCartSelector } from '@/store/selectors/cartSelector';
import { moveCart } from '@/store/slices/cartSlice';
import { useCallback, type FC, memo, useRef, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { BetweenBun } from '../between-bun/between-bun';

import type { TIngredientNanoid } from '@/utils/types';

import styles from '../burger-constructor/burger-constructor.module.css';

type TBetweenBunParent = {
  ingredient: TIngredientNanoid;
  isDraggingGlobal?: boolean;
  onDragStart?: (id: string) => void;
  onDragEnd?: () => void;
};

type Item = {
  id: string;
  originalIndex: number;
  ingredient: TIngredientNanoid;
};

export const BetweenBunParent: FC<TBetweenBunParent> = memo(function BetweenBunParent({
  ingredient,
  isDraggingGlobal,
  onDragStart,
  onDragEnd,
}) {
  const dispatch = useDispatch();
  const dragRef = useRef<HTMLLIElement>(null);
  const ingredientIndex = useSelector(findCartSelector(ingredient.nanoid)).index;

  const handleHover = useCallback(
    (item: Item) => {
      if (!dragRef.current) return;

      const dragId = item.id;
      if (dragId !== ingredient.nanoid) {
        const hoverIndex = ingredientIndex;
        const dragIndex = item.originalIndex;
        if (dragIndex === hoverIndex) return;
        dispatch(moveCart({ id: dragId, to: hoverIndex }));
        item.originalIndex = hoverIndex;
      }
    },
    [ingredientIndex, dispatch, ingredient.nanoid]
  );

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'CART',
    item: () => {
      onDragStart?.(ingredient.nanoid);
      return {
        id: ingredient.nanoid,
        originalIndex: ingredientIndex,
        ingredient: ingredient,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      onDragEnd?.();
      const { id: droppedId, originalIndex } = item as Item;
      const didDrop = monitor.didDrop();

      if (!didDrop) {
        const currentIndex = ingredientIndex;
        if (originalIndex !== currentIndex) {
          dispatch(moveCart({ id: droppedId, to: currentIndex }));
        }
      }
    },
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const [, drop] = useDrop({
    accept: 'CART',
    hover: handleHover,
  });

  useEffect(() => {
    if (dragRef.current) {
      drag(drop(dragRef.current));
    }
  }, [drag, drop]);

  const isActiveDrag = isDragging || isDraggingGlobal;
  const opacity = isActiveDrag ? 0 : 1;

  return (
    <li ref={dragRef} className={styles.element_card_list} style={{ opacity }}>
      <BetweenBun ingredient={ingredient} />
    </li>
  );
});

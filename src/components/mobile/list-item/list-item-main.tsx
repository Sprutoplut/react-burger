import { findCartSelector } from '@/store/selectors/cartSelector';
import { moveCart } from '@/store/slices/cartSlice';
import {
  CurrencyIcon,
  DeleteIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useCallback, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useSwipeable } from 'react-swipeable';

import type { TIngredientNanoid } from '@/utils/types';

import styles from './list-item.module.css';

type TListItemMain = {
  ingredient: TIngredientNanoid;
  isDraggingGlobal?: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  isSwipeOpen: boolean;
  onSwipeOpen: () => void;
  onSwipeClose: () => void;
  onDelete: () => void;
};

type Item = {
  id: string;
  originalIndex: number;
  ingredient: TIngredientNanoid;
};

export const ListItemMain = ({
  ingredient,
  onDragStart,
  onDragEnd,
  isDraggingGlobal,
  isSwipeOpen,
  onSwipeOpen,
  onSwipeClose,
  onDelete,
}: TListItemMain): React.JSX.Element => {
  const dispatch = useDispatch();
  const dragRef = useRef<HTMLLIElement>(null);
  const [localSwipeOffset, setLocalSwipeOffset] = useState(0);
  const SWIPE_MAX_WIDTH = 100;

  const ingredientIndex = useSelector(findCartSelector(ingredient.nanoid)).index;

  useEffect(() => {
    if (isSwipeOpen) {
      setLocalSwipeOffset(SWIPE_MAX_WIDTH);
    } else {
      setLocalSwipeOffset(0);
    }
  }, [isSwipeOpen]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      onSwipeOpen();
    },
    onSwipedRight: () => {
      if (isSwipeOpen) {
        onSwipeClose();
      }
    },
    onSwiping: (eventData) => {
      if (eventData.dir === 'Left' && !isSwipeOpen) {
        const deltaX = Math.min(Math.abs(eventData.deltaX), SWIPE_MAX_WIDTH);
        setLocalSwipeOffset(deltaX);
      } else if (eventData.dir === 'Right' && isSwipeOpen) {
        const deltaX = Math.max(SWIPE_MAX_WIDTH - Math.abs(eventData.deltaX), 0);
        setLocalSwipeOffset(deltaX);
      }
    },
    onSwiped: () => {
      const threshold = SWIPE_MAX_WIDTH / 2;
      if (!isSwipeOpen && localSwipeOffset > threshold) {
        onSwipeOpen();
      } else if (isSwipeOpen && localSwipeOffset < threshold) {
        onSwipeClose();
      } else if (!isSwipeOpen) {
        setLocalSwipeOffset(0);
      } else if (isSwipeOpen) {
        setLocalSwipeOffset(SWIPE_MAX_WIDTH);
      }
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 10,
  });

  const handleMouseLeave = (): void => {
    if (isSwipeOpen) {
      onSwipeClose();
    }
  };

  const handleHover = useCallback(
    (item: Item) => {
      if (!dragRef.current) return;

      if (item.id !== ingredient.nanoid) {
        const hoverIndex = ingredientIndex;
        const dragIndex = item.originalIndex;
        if (dragIndex !== hoverIndex) {
          dispatch(moveCart({ id: item.id, to: hoverIndex }));
          item.originalIndex = hoverIndex;
        }
      }
    },
    [ingredientIndex, dispatch, ingredient.nanoid]
  );

  const [, drag, preview] = useDrag({
    type: 'CART',
    item: () => {
      onDragStart(ingredient.nanoid);
      return {
        id: ingredient.nanoid,
        originalIndex: ingredientIndex,
        ingredient,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      onDragEnd();
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

  const [, drop] = useDrop({
    accept: 'CART',
    hover: handleHover,
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  useEffect(() => {
    if (dragRef.current) {
      drag(drop(dragRef.current));
    }
  }, [drag, drop]);

  const isActiveDrag = isDraggingGlobal;
  const opacity = isActiveDrag ? 0 : 1;
  const swipeOffset = isSwipeOpen
    ? localSwipeOffset
    : localSwipeOffset > 0
      ? localSwipeOffset
      : 0;

  return (
    <li className={`${styles.list_item} pb-4 pt-4`} ref={dragRef} style={{ opacity }}>
      <div
        className={`${styles.content_wrapper} pr-2`}
        style={{
          transform: `translateX(-${swipeOffset}px)`,
          transition:
            swipeOffset === 0 || swipeOffset === SWIPE_MAX_WIDTH
              ? 'transform 0.3s ease'
              : 'none',
        }}
        onMouseLeave={handleMouseLeave}
        {...handlers}
      >
        <div className={`${styles.list_content} mr-2`}>
          <div className={styles.list_drag}>
            <DragIcon type="primary" />
          </div>
          <img src={ingredient.image_mobile} alt={ingredient.name} />
          <p className="text text_type_main-default">{ingredient.name}</p>
        </div>
        <div className={styles.price_total_number}>
          <p className="text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <div
        className={styles.delete_button}
        onClick={onDelete}
        style={{
          width: `${swipeOffset}px`,
          transition:
            swipeOffset === 0 || swipeOffset === SWIPE_MAX_WIDTH
              ? 'width 0.3s ease'
              : 'none',
        }}
      >
        <DeleteIcon type="primary" />
      </div>
    </li>
  );
};

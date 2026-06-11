import { useDragLayer, type XYCoord } from 'react-dnd';

import { ListItemMain } from '../mobile/list-item/list-item-main';

import type { TIngredientNanoid } from '@/utils/types';

import styles from './between-bun.module.css';

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
): React.CSSProperties {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }

  const { y } = currentOffset;
  const fixedX = initialOffset.x;
  const transform = `translate(${fixedX}px, ${y}px)`;
  return { transform, WebkitTransform: transform };
}

type DragItem = {
  ingredient: TIngredientNanoid;
};

type DragLayerProps = {
  item: DragItem | null;
  itemType: string | symbol | null;
  initialOffset: XYCoord | null;
  currentOffset: XYCoord | null;
  isDragging: boolean;
};

export const ListItemLayer = (): React.JSX.Element | null => {
  const { item, itemType, isDragging, initialOffset, currentOffset } =
    useDragLayer<DragLayerProps>((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  if (!isDragging || !item) {
    return null;
  }

  const noop = (): void => {
    // Пустая функция-заглушка
  };

  const noopWithId = (_id: string): void => {
    // Пустая функция-заглушка с параметром
  };

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {itemType === 'CART' && (
          <div className={styles.drag_preview}>
            <ListItemMain
              ingredient={item.ingredient}
              onDragStart={noopWithId}
              onDragEnd={noop}
              isSwipeOpen={false}
              onSwipeOpen={noop}
              onSwipeClose={noop}
              onDelete={noop}
            />
          </div>
        )}
      </div>
    </div>
  );
};

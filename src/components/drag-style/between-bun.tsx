import { useDragLayer, type XYCoord } from 'react-dnd';

import { BetweenBun } from '../between-bun/between-bun';

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

export const BetweenBunLayer = (): React.JSX.Element | null => {
  const dragLayer = useDragLayer<DragLayerProps>((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const { item, itemType, isDragging, initialOffset, currentOffset } = dragLayer;

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {itemType === 'CART' && item && (
          <div className={styles.drag_preview}>
            <BetweenBun ingredient={item.ingredient} />
          </div>
        )}
      </div>
    </div>
  );
};

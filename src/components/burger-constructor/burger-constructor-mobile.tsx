import { ListConstructor } from '../mobile/list-constructor/list-constructor';
import { MobileHead } from '../mobile/mobile-head/mobile-head';

import type { TIngredient, TIngredientNanoid } from '@/utils/types';

type TMobileBurgerConstructor = {
  bun: TIngredient;
  main: TIngredientNanoid[];
  onClose?: () => void;
  draggedIngredientId: string | null;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDropIngredient: (item: TIngredientNanoid) => void;
};

export const MobileBurgerConstructor = ({
  bun,
  main,
  onClose,
  draggedIngredientId,
  onDragStart,
  onDragEnd,
  onDropIngredient,
}: TMobileBurgerConstructor): React.JSX.Element => {
  return (
    <>
      <MobileHead title="Заказ" onClose={onClose as () => void} />
      <ListConstructor
        bun={bun}
        main={main}
        draggedIngredientId={draggedIngredientId}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDropIngredient={onDropIngredient}
      />
    </>
  );
};

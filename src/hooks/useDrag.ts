import { useCallback, useState } from 'react';

type UseDragStateReturn = {
  draggedIngredientId: string | null;
  handleDragStart: (id: string) => void;
  handleDragEnd: () => void;
};

export const useDragState = (): UseDragStateReturn => {
  const [draggedIngredientId, setDraggedIngredientId] = useState<string | null>(null);

  const handleDragStart = useCallback((id: string) => {
    setDraggedIngredientId(id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIngredientId(null);
  }, []);

  return {
    draggedIngredientId,
    handleDragStart,
    handleDragEnd,
  };
};

import { useCallback, useEffect } from 'react';

import type { Ttype_ingredients } from '@utils/types';

type UseScrollOptions = {
  typeIngredients: readonly Ttype_ingredients[];
  currentTab: Ttype_ingredients;
  setCurrentTab: React.Dispatch<React.SetStateAction<Ttype_ingredients>>;
  parentRef: React.RefObject<HTMLUListElement | null>;
  tabsRef: React.RefObject<Record<string, HTMLElement | null>>;
};

export const useScroll = ({
  typeIngredients,
  currentTab,
  setCurrentTab,
  parentRef,
  tabsRef,
}: UseScrollOptions): void => {
  const findClosestBlock = useCallback(() => {
    if (!parentRef.current) {
      return;
    }

    let closestBlock: Ttype_ingredients | null = null;
    let minDistance = Infinity;

    const container = parentRef.current;

    for (const ingredientType of typeIngredients) {
      const block = tabsRef.current[ingredientType.type];
      if (!block) {
        continue;
      }

      const blockRect = block.getBoundingClientRect();

      const containerRect = container.getBoundingClientRect();

      const distance = blockRect.top - containerRect.top;

      const absDistance = Math.abs(distance);

      if (absDistance < minDistance) {
        minDistance = absDistance;
        closestBlock = ingredientType;
      }
    }

    if (closestBlock && closestBlock.type !== currentTab.type) {
      setCurrentTab(closestBlock);
    }
  }, [typeIngredients, currentTab.type, setCurrentTab, tabsRef]);

  useEffect(() => {
    const container = parentRef.current;

    if (!container) {
      return;
    }

    const handleScroll = (): void => {
      requestAnimationFrame(findClosestBlock);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    findClosestBlock();

    return (): void => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [findClosestBlock, parentRef]);
};

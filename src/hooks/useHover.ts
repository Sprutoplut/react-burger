import { useState, useCallback } from 'react';

import type { TIconTypes } from '@/utils/types';

type TuseHover = {
  type: TIconTypes;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const useHover = (
  initial: TIconTypes = 'primary',
  hover: TIconTypes = 'secondary'
): TuseHover => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => setIsHover(false), []);

  return {
    type: isHover ? hover : initial,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};

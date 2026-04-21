import { useEffect, useState } from 'react';

type TuseWindowSize = {
  screenType: string;
  width: number;
};

export const useWindowSize = (): TuseWindowSize => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (): void => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  const screenType = width < 1261 ? 'mobile' : 'desktop';

  return { screenType, width };
};

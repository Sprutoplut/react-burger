import { AppHeader } from '@/components/app-header/app-header';
import { MenuMobile } from '@/components/mobile/menu/menu';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useState } from 'react';

import { HeaderMobile } from '../mobile/header/header';

export const Header = (): React.JSX.Element => {
  const { screenType } = useWindowSize();
  const [menu, setMenu] = useState(false);

  if (screenType === 'mobile') {
    return (
      <>
        {!menu && <HeaderMobile onClick={() => setMenu(true)} />}
        {menu && <MenuMobile onClose={() => setMenu(false)} />}
      </>
    );
  }

  return <AppHeader />;
};

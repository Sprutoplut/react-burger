import { useMemo, useState } from 'react';

import { SubMenuItemMobile } from '../submenu-item/submenu-item';

import type { TValueMenuItems } from '@/utils/types';

import styles from './submenu.module.css';

type TSubMenuMobile = {
  arrItem: TValueMenuItems[];
  isClick: boolean;
};

export const SubMenuMobile = ({
  arrItem,
  isClick,
}: TSubMenuMobile): React.JSX.Element => {
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);
  const active = useMemo(() => {
    if (!isClick) return false;
    else return true;
  }, [isClick]);
  return (
    <div className={`${styles.submenu} pl-8`}>
      {arrItem.map((item) => (
        <SubMenuItemMobile
          key={item.text}
          text={item.text}
          href={item.href}
          isClick={active === true && activeSubItem === item.text}
          onClick={() => setActiveSubItem(item.text)}
        />
      ))}
    </div>
  );
};

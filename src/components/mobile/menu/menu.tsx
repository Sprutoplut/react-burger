import { menu } from '@/utils/constants';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ReactNode } from 'react';

import { MenuItemMobile } from '../menu-item/menu-item';
import { MobileHead } from '../mobile-head/mobile-head';
import { MenuItemWithSubMobile } from '../withsub/withsub';

import type { TIconTypes } from '@/utils/types';

import styles from './menu.module.css';

type TMenuMobile = {
  onClose: () => void;
};

export const MenuMobile = ({ onClose }: TMenuMobile): React.JSX.Element => {
  const [activeItem, setActiveItem] = useState<string>(menu[1].text);

  const getIcon = (
    iconType: string | undefined,
    type: TIconTypes = 'primary'
  ): ReactNode | null => {
    switch (iconType) {
      case 'profile':
        return <ProfileIcon type={type} />;
      case 'burger':
        return <BurgerIcon type={type} />;
      case 'orders':
        return <ListIcon type={type} />;
      default:
        return null;
    }
  };

  const handleMenuSubItemClick = (text: string): void => {
    if (activeItem === text) {
      setActiveItem('');
    } else {
      setActiveItem(text);
    }
  };

  return (
    <section className={`${styles.open_menu} pb-4 pr-2 pl-2`}>
      <MobileHead title="Меню" onClose={onClose} />
      <nav className={styles.menu_items}>
        {menu.map((item) =>
          item.submenu === undefined ? (
            <MenuItemMobile
              key={item.text}
              text={item.text}
              icon={getIcon(
                item.iconType,
                activeItem === item.text ? 'primary' : 'secondary'
              )}
              href={item.href}
              isClick={activeItem === item.text}
              onClick={() => setActiveItem(item.text)}
            />
          ) : (
            <MenuItemWithSubMobile
              key={item.text}
              text={item.text}
              icon={getIcon(
                item.iconType,
                activeItem === item.text ? 'primary' : 'secondary'
              )}
              href={item.href}
              isClick={activeItem === item.text}
              onClick={() => handleMenuSubItemClick(item.text)}
              arrItem={item.submenu}
            />
          )
        )}
      </nav>
    </section>
  );
};

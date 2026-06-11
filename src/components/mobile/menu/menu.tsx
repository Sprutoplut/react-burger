import { menu } from '@/utils/constants';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { MenuItemMobile } from '../menu-item/menu-item';
import { MobileHead } from '../mobile-head/mobile-head';
import { MenuItemWithSubMobile } from '../withsub/withsub';

import type { TIconTypes } from '@/utils/types';

import styles from './menu.module.css';

type TMenuMobile = {
  onClose: () => void;
};

export const MenuMobile = ({ onClose }: TMenuMobile): React.JSX.Element => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('');

  useEffect(() => {
    for (const item of menu) {
      if (item.href && `/${item.href}` === location.pathname) {
        setActiveItem(item.text);
        return;
      }

      if (item.submenu) {
        const hasActiveSubItem = item.submenu.some(
          (subItem) => subItem.href === location.pathname
        );
        if (hasActiveSubItem) {
          setActiveItem(item.text);
          return;
        }
      }
    }
    setActiveItem('');
  }, [location.pathname]);

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

  const handleMenuItemClick = (item: (typeof menu)[0]): void => {
    if (item.submenu) {
      setActiveItem(activeItem === item.text ? '' : item.text);
    } else {
      onClose();
    }
  };

  const handleSubMenuItemClick = (): void => {
    onClose();
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
              onClick={() => handleMenuItemClick(item)}
              onClose={onClose}
            />
          ) : (
            <MenuItemWithSubMobile
              key={item.text}
              text={item.text}
              icon={getIcon(
                item.iconType,
                activeItem === item.text ? 'primary' : 'secondary'
              )}
              isOpen={activeItem === item.text}
              onClick={() => handleMenuItemClick(item)}
              arrItem={item.submenu}
              onSubItemClick={handleSubMenuItemClick}
            />
          )
        )}
      </nav>
    </section>
  );
};

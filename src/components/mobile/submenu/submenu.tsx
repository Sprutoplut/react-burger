import { NavLink } from 'react-router-dom';

import { LogoutItem } from './sublogout';

import type { TValueSubMenuItems } from '@/utils/types';

import styles from './submenu.module.css';

type TSubMenuMobile = {
  arrItem: TValueSubMenuItems[];
  onSubItemClick: () => void;
};

export const SubMenuMobile = ({
  arrItem,
  onSubItemClick,
}: TSubMenuMobile): React.JSX.Element => {
  return (
    <div className={`${styles.submenu} pl-8`}>
      {arrItem.map((item) => (
        <NavLink
          key={item.text}
          to={item.href}
          end
          className={({ isActive }) =>
            `text text_type_main-default ml-2 ${styles.link} ${isActive && styles.link_active}`
          }
          onClick={onSubItemClick}
        >
          {item.text}
        </NavLink>
      ))}
      <LogoutItem />
    </div>
  );
};

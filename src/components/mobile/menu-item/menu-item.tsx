import { NavLink } from 'react-router-dom';

import type { ReactNode } from 'react';

import styles from './menu-item.module.css';

type TMenuItemMobile = {
  text: string;
  icon: ReactNode;
  href: string;
  onClick: () => void;
  onClose: () => void;
};

export const MenuItemMobile = ({
  text,
  icon,
  href,
  onClick,
  onClose,
}: TMenuItemMobile): React.JSX.Element => {
  return (
    <NavLink
      to={href}
      className={`${styles.menu_item} pb-3 pt-3`}
      onClick={() => {
        onClick();
        onClose();
      }}
    >
      {({ isActive }) => (
        <>
          {icon}
          <p
            className={`text text_type_main-default ml-2 ${isActive && styles.link_active}`}
          >
            {text}
          </p>
        </>
      )}
    </NavLink>
  );
};

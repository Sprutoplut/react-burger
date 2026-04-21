import type { ReactNode } from 'react';

import styles from './menu-item.module.css';

type TMenuItemMobile = {
  text: string;
  icon: ReactNode;
  href?: string;
  isClick: boolean;
  onClick: () => void;
};

export const MenuItemMobile = ({
  text,
  icon,
  href,
  isClick,
  onClick,
}: TMenuItemMobile): React.JSX.Element => {
  return (
    <a className={`${styles.menu_item} pb-3 pt-3`} href={href} onClick={onClick}>
      {icon}
      <p className={`text ${!isClick && 'text_color_inactive'} text_type_main-default`}>
        {text}
      </p>
    </a>
  );
};

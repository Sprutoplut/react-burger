import { ArrowDownIcon, ArrowUpIcon } from '@krgaa/react-developer-burger-ui-components';

import { SubMenuMobile } from '../submenu/submenu';

import type { TValueSubMenuItems } from '@/utils/types';
import type { ReactNode } from 'react';

import styles from './withsub.module.css';

type TMenuItemWithSubMobile = {
  text: string;
  icon: ReactNode;
  isOpen: boolean;
  onClick: () => void;
  arrItem: TValueSubMenuItems[];
  onSubItemClick: () => void;
};

export const MenuItemWithSubMobile = ({
  text,
  icon,
  isOpen,
  onClick,
  arrItem,
  onSubItemClick,
}: TMenuItemWithSubMobile): React.JSX.Element => {
  return (
    <div className={styles.sub_container}>
      <div className={`${styles.withsub} pb-3 pt-3`} onClick={onClick}>
        <div className={styles.withsub_ico}>
          {icon}
          <p
            className={`text ${!isOpen ? 'text_color_inactive' : ''} text_type_main-default`}
          >
            {text}
          </p>
        </div>
        {isOpen ? <ArrowUpIcon type="primary" /> : <ArrowDownIcon type="primary" />}
      </div>
      {isOpen && <SubMenuMobile arrItem={arrItem} onSubItemClick={onSubItemClick} />}
    </div>
  );
};

import { ArrowDownIcon, ArrowUpIcon } from '@krgaa/react-developer-burger-ui-components';

import { SubMenuMobile } from '../submenu/submenu';

import type { TValueSubMenuItems } from '@/utils/types';
import type { ReactNode } from 'react';

import styles from './withsub.module.css';

type TMenuItemWithSubMobile = {
  text: string;
  icon: ReactNode;
  href?: string;
  isClick: boolean;
  onClick: () => void;
  arrItem: TValueSubMenuItems[];
};

export const MenuItemWithSubMobile = ({
  text,
  icon,
  isClick,
  onClick,
  arrItem,
}: TMenuItemWithSubMobile): React.JSX.Element => {
  return (
    <div className={styles.sub_container}>
      <a className={`${styles.withsub} pb-3 pt-3`} onClick={onClick}>
        <div className={styles.withsub_ico}>
          {icon}
          <p
            className={`text ${!isClick && 'text_color_inactive'} text_type_main-default`}
          >
            {text}
          </p>
        </div>
        {isClick ? <ArrowUpIcon type="primary" /> : <ArrowDownIcon type="primary" />}
      </a>
      {isClick && <SubMenuMobile arrItem={arrItem} isClick={isClick} />}
    </div>
  );
};

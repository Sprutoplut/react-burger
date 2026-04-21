import { MenuIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './header.module.css';

type THeaderMobile = {
  onClick: () => void;
};

export const HeaderMobile = ({ onClick }: THeaderMobile): React.JSX.Element => {
  return (
    <header className={`${styles.header} pr-2 pl-2 pb-3 pt-3`}>
      <img src="logo.svg" />
      <MenuIcon type="primary" onClick={onClick} />
    </header>
  );
};

import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './list-item.module.css';

type TListItemEmpty = {
  isBun?: boolean;
};

export const ListItemEmpty = ({ isBun }: TListItemEmpty): React.JSX.Element => (
  <li className={`${styles.list_item} pb-4 pt-4`}>
    <div className={`${styles.list_content} mr-2`}>
      <img src={'/loading.svg'} alt={'loading'} />
      <p className="text text_type_main-default">
        {isBun ? 'Выберите булочку' : 'Выберите начинку'}
      </p>
    </div>
    <div className={styles.price_total_number}>
      <p className="text_type_digits-default">0</p>
      <CurrencyIcon type="primary" />
    </div>
  </li>
);

import { CurrencyIcon, DragIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './list-item.module.css';

type TListItemBun = {
  ingredient: TIngredient;
};

export const ListItemBun = ({ ingredient }: TListItemBun): React.JSX.Element => (
  <li className={`${styles.list_item} pb-4 pt-4`}>
    <div className={`${styles.list_content} mr-2`}>
      <div className={styles.list_drag}>
        <DragIcon type="disabled" />
      </div>
      <img src={ingredient.image_mobile} alt={ingredient.name} />
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
    <div className={`${styles.price_total_number} pb-4 pt-4 pr-2`}>
      <p className="text_type_digits-default">{ingredient.price}</p>
      <CurrencyIcon type="primary" />
    </div>
  </li>
);

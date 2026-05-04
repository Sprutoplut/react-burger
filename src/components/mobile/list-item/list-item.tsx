import { CurrencyIcon, DragIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './list-item.module.css';

type TListItem = {
  ingredient: TIngredient;
};

export const ListItem = ({ ingredient }: TListItem): React.JSX.Element => {
  console.log(ingredient._id);
  return (
    <li
      className={`${styles.list_item} pb-4 pt-4`}
      draggable={`${ingredient.type === 'bun' ? 'false' : 'true'}`}
    >
      <div className={`${styles.list_content} mr-2`}>
        <div className={styles.list_drag}>
          <DragIcon type={`${ingredient.type === 'bun' ? 'disabled' : 'primary'}`} />
        </div>
        <img src={ingredient.image_mobile} alt={ingredient.name} />
        <p className="text text_type_main-default">{ingredient.name}</p>
      </div>
      <div className={styles.price_total_number}>
        <p className="text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
};

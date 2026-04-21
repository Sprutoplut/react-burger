import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';

import styles from './cart-bun.module.css';

type TCartBun = {
  ingredient: TIngredient | undefined;
  direction: 'top' | 'bottom' | undefined;
};

export const CartBun = ({ ingredient, direction }: TCartBun): React.JSX.Element => {
  return (
    <li className={`${styles.header_cart_list} pl-8`}>
      <ConstructorElement
        isLocked
        price={ingredient!.price}
        text={ingredient!.name}
        thumbnail={ingredient!.image_mobile}
        type={direction}
      />
    </li>
  );
};

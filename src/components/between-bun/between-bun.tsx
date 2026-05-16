import { removeFromCart } from '@/store/slices/cartSlice';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react/jsx-runtime';

import type { TIngredientNanoid } from '@/utils/types';

import styles from './between-bun.module.css';

type TBetweenBun = {
  ingredient?: TIngredientNanoid;
};

export const BetweenBun = ({ ingredient }: TBetweenBun): React.JSX.Element => {
  const dispatch = useDispatch();

  const handleRemove = (): void => {
    if (ingredient?.nanoid) {
      dispatch(removeFromCart(ingredient.nanoid));
    }
  };
  return (
    <Fragment>
      {ingredient && (
        <div className={styles.drag}>
          <DragIcon type="primary" />
        </div>
      )}

      <ConstructorElement
        price={ingredient ? ingredient.price : 0}
        text={ingredient ? ingredient.name : 'Перенесите начинку'}
        thumbnail={ingredient ? ingredient.image_mobile : 'loading.svg'}
        isLocked={ingredient ? false : true}
        handleClose={ingredient ? handleRemove : undefined}
      />
    </Fragment>
  );
};

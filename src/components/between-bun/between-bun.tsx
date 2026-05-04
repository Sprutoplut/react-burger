import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { Fragment } from 'react/jsx-runtime';

import type { TIngredient } from '@/utils/types';

import styles from './between-bun.module.css';

type TBetweenBun = {
  ingredient: TIngredient;
};

export const BetweenBun = ({ ingredient }: TBetweenBun): React.JSX.Element => {
  return (
    <Fragment>
      <div className={styles.drag}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        price={ingredient.price}
        text={ingredient.name}
        thumbnail={ingredient.image_mobile}
      />
    </Fragment>
  );
};

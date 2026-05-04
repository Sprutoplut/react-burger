import { ListItem } from '../list-item/list-item';

import type { TIngredient } from '@/utils/types';

import styles from './list-constructor.module.css';

type TListConstructor = {
  bun: TIngredient;
  main: TIngredient[];
};

export const ListConstructor = ({ bun, main }: TListConstructor): React.JSX.Element => {
  return (
    <ul className={`${styles.list} pb-10`}>
      <ListItem ingredient={bun}></ListItem>
      {main.map((main, index) => (
        <ListItem key={`${main._id}-${index}`} ingredient={main}></ListItem>
      ))}
      <ListItem ingredient={bun}></ListItem>
    </ul>
  );
};

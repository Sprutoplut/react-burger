import { AppHeader } from '@/components/app-header/app-header';
import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';

import styles from './desktop.module.css';

export const DesktopLayout = (): React.JSX.Element => {
  return (
    <>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main}  pb-10`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
};

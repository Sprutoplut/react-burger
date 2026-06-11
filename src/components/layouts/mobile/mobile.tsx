import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { Footer } from '@/components/mobile/footer/footer';
import { useState } from 'react';

import styles from '../desktop/desktop.module.css';

export const MobileLayout = (): React.JSX.Element => {
  const [order, setOrder] = useState(false);
  const handleOrderToggle = (): void => {
    setOrder((prev) => !prev);
  };

  return (
    <>
      {!order ? (
        <>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
            Соберите бургер
          </h1>
          <BurgerIngredients />
        </>
      ) : (
        <BurgerConstructor onClose={() => setOrder(false)} />
      )}
      <Footer active={order} onClick={handleOrderToggle} />
    </>
  );
};

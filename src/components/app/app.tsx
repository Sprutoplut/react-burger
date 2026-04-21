import { useIngredient } from '@/hooks/useIngredients';
import { useWindowSize } from '@/hooks/useWindowSize';
import { inCart } from '@/utils/inCart';
import { useEffect } from 'react';

import { CartProvider } from '../contexts/cart/cart-provider';
import { Error } from '../error/error';
import { DesktopLayout } from '../layouts/desktop/desktop';
import { MobileLayout } from '../layouts/mobile/mobile';
import { Loader } from '../loader/loader';
import { Modal } from '../modal-window/modal/modal';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const { ingredients, loading, error, getIngredients } = useIngredient();
  const { screenType } = useWindowSize();

  useEffect(() => {
    getIngredients().catch((err) => {
      console.error('Ошибка:', err);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error text="Ошибка получения данных" />;
  }

  return (
    <CartProvider newCart={inCart} ingredients={ingredients}>
      <div className={styles.app}>
        {screenType === 'mobile' && <MobileLayout />}
        {screenType === 'desktop' && <DesktopLayout />}
        <Modal />
      </div>
    </CartProvider>
  );
};

export default App;

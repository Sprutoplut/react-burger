import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useWindowSize } from '@/hooks/useWindowSize';
import { useGetIngredientsQuery } from '@/store/api/ingredientsApi';
import { closeModal } from '@/store/slices/modalSlice';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { DndProvider } from 'react-dnd-multi-backend';

import ErrorBoundary from '../error-boundary/error-boundary';
import { Error } from '../error/error';
import { DesktopLayout } from '../layouts/desktop/desktop';
import { MobileLayout } from '../layouts/mobile/mobile';
import { Loader } from '../loader/loader';
import { IngredientDetails } from '../modal-window/ingredient-details/ingredient-details';
import { Modal } from '../modal-window/modal/modal';
import { OrderDetails } from '../modal-window/order-details/order-details';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const { isLoading, error } = useGetIngredientsQuery();
  const { screenType } = useWindowSize();
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const orderNum = useAppSelector((state) => state.modal.orderNum);
  const ingredient = useAppSelector((state) => state.modal.ingredient);
  const modalTitle = useAppSelector((state) => state.modal.title);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error text="Ошибка получения данных" />;
  }

  return (
    <div className={styles.app}>
      <DndProvider options={HTML5toTouch}>
        <ErrorBoundary>
          {screenType === 'mobile' && <MobileLayout />}
          {screenType === 'desktop' && <DesktopLayout />}
          <Modal
            isOpen={isModalOpen}
            closeModal={() => dispatch(closeModal())}
            title={modalTitle}
          >
            {orderNum && <OrderDetails orderNum={orderNum} />}
            {ingredient && <IngredientDetails ingredient={ingredient} />}
          </Modal>
        </ErrorBoundary>
      </DndProvider>
    </div>
  );
};

export default App;

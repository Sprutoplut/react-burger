import { IngredientDetails } from '@/components/modal-window/ingredient-details/ingredient-details';
import { Modal } from '@/components/modal-window/modal/modal';
import { OrderDetails } from '@/components/modal-window/order-details/order-details';
import { OrderDetail } from '@/components/order-detail/order-detail';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { closeModal } from '@/store/slices/modalSlice';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppRoutes } from './routes';

type LocationState = {
  background?: Location;
  order?: boolean;
  feed?: boolean;
};

export const RoutesWithModal = (): React.JSX.Element => {
  const location = useLocation();
  const background = (location.state as LocationState)?.background;
  const order = (location.state as LocationState)?.order;
  const feed = (location.state as LocationState)?.feed;
  const { isOpen, type, orderNum, title } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleCloseModal = (): void => {
    dispatch(closeModal());
    window.history.back();
  };

  const handleCloseOrderModal = (): void => {
    dispatch(closeModal());
  };

  return (
    <>
      <Routes location={background ?? location}>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal isOpen={isOpen} closeModal={handleCloseModal} title={title}>
                <IngredientDetails />
              </Modal>
            }
          />
          {order && (
            <Route
              path="/profile/orders/:id"
              element={
                <Modal isOpen={isOpen} closeModal={handleCloseModal} title={title}>
                  <OrderDetail />
                </Modal>
              }
            />
          )}
          {feed && (
            <Route
              path="/feed/:id"
              element={
                <Modal isOpen={isOpen} closeModal={handleCloseModal} title={title}>
                  <OrderDetail />
                </Modal>
              }
            />
          )}
        </Routes>
      )}

      {isOpen && type === 'order' && orderNum && (
        <Modal isOpen={isOpen} closeModal={handleCloseOrderModal} title={title}>
          <OrderDetails orderNum={orderNum} />
        </Modal>
      )}
    </>
  );
};

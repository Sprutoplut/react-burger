import { useCart } from '@/hooks/useCart.ts';
import { useWindowSize } from '@/hooks/useWindowSize';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { OrderDetails } from '../order-details/order-details';

import styles from './modal.module.css';

export const Modal = (): React.JSX.Element | null => {
  const [isPortalReady, setIsPortalReady] = useState(false);
  const { isOpen, closeModal, detailIng } = useCart();
  const modalRoot = useRef<HTMLDivElement | null>(null);
  const { screenType } = useWindowSize();

  useEffect(() => {
    const div = document.createElement('div');
    div.className = 'modal-root';
    document.body.appendChild(div);
    modalRoot.current = div;
    setIsPortalReady(true);

    return (): void => {
      if (modalRoot.current) {
        document.body.removeChild(modalRoot.current);
      }
      setIsPortalReady(false);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen && isPortalReady) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isPortalReady, closeModal]);

  if (!isOpen || !isPortalReady) return null;

  return createPortal(
    <>
      <ModalOverlay onClick={closeModal} />
      <div className={`${styles.modal} p-10`}>
        <div className={styles.modal_header}>
          <h1 className="text text_type_main-large">
            {detailIng !== null && screenType !== 'mobile' && 'Детали ингредиента'}
            {detailIng === null && screenType === 'mobile' && 'Заказ оформлен'}
          </h1>
          <CloseIcon
            className={styles.closeButton}
            type="primary"
            onClick={closeModal}
          />
        </div>
        {detailIng !== null ? (
          <IngredientDetails ingredient={detailIng} />
        ) : (
          <OrderDetails />
        )}
      </div>
    </>,
    modalRoot.current!
  );
};

import { useHover } from '@/hooks/useHover';
import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

type TModal = {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
};

export const Modal = ({
  title,
  closeModal,
  children,
  isOpen,
}: TModal): React.JSX.Element | null => {
  const [isPortalReady, setIsPortalReady] = useState(false);
  const { type, onMouseEnter, onMouseLeave } = useHover();
  const modalRoot = useRef<HTMLDivElement | null>(null);

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
      onMouseLeave();
    };
  }, [isOpen, isPortalReady, closeModal]);

  if (!isOpen || !isPortalReady) return null;

  return createPortal(
    <>
      <ModalOverlay onClick={closeModal} />
      <div className={`${styles.modal} p-10`}>
        <div className={styles.modal_header}>
          <h1 className="text text_type_main-large">{title}</h1>
          <div
            className={styles.closeButton}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <CloseIcon type={type} onClick={closeModal} />
          </div>
        </div>
        {children}
      </div>
    </>,
    modalRoot.current!
  );
};

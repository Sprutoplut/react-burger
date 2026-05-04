import ErrorBoundary from '@/components/error-boundary/error-boundary';
import { Modal } from '@/components/modal-window/modal/modal';
import { useState, useCallback, type ReactNode } from 'react';

import { CartContext } from './cart';

import type { TIngredient } from '@/utils/types';

type TCartProvider = {
  children: React.ReactNode;
  newCart: TIngredient[];
  ingredients: TIngredient[];
};

export const CartProvider = ({
  children,
  ingredients,
  newCart,
}: TCartProvider): React.JSX.Element => {
  const [cart, setCart] = useState<TIngredient[]>(newCart);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (content: ReactNode, title: string): void => {
    setModalContent(content);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle('');
  };

  const addToCart = useCallback(
    (id: string) => {
      const product = ingredients.find((p) => p._id === id);
      if (!product) return;

      setCart((prevCart) => {
        const existingBunIndex =
          product.type === 'bun'
            ? prevCart.findIndex((item) => item.type === 'bun')
            : -1;

        let newCart = [...prevCart];

        if (product.type === 'bun' && existingBunIndex !== -1) {
          newCart = newCart.filter((_, index) => index !== existingBunIndex);
        }

        return [...newCart, product];
      });
    },
    [ingredients]
  );
  return (
    <CartContext.Provider
      value={{
        cart,
        ingredients,
        addToCart,
        openModal,
        closeModal,
        isModalOpen,
      }}
    >
      <ErrorBoundary>
        {children}
        <Modal isOpen={isModalOpen} closeModal={closeModal} title={modalTitle}>
          {modalContent}
        </Modal>
      </ErrorBoundary>
    </CartContext.Provider>
  );
};

import { useState, useCallback } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [detailIng, setDetailIng] = useState<TIngredient | null>(null);
  const [orderNum, setOrderNum] = useState<number | null>(null);

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

  const openModal = useCallback(
    (ingredient: TIngredient | null, orderNum: number | null) => {
      setDetailIng(ingredient);
      setOrderNum(orderNum);
      setIsOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setOrderNum(null);
    setDetailIng(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        ingredients,
        detailIng,
        orderNum,
        isOpen,
        addToCart,
        openModal,
        closeModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

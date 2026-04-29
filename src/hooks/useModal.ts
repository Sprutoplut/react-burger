import { ModalContext } from '@/components/contexts/modal/modal';
import { useContext } from 'react';

import type { TModalContext } from '@/utils/types';

export const useModal = (): TModalContext => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('Ошибка');
  }
  return context;
};

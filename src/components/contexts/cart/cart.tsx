import { createContext } from 'react';

import type { TCartContext } from '@/utils/types';

export const CartContext = createContext<TCartContext | undefined>(undefined);

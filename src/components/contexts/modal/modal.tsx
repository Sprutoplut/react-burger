import { createContext } from 'react';

import type { TModalContext } from '@/utils/types';

export const ModalContext = createContext<TModalContext | undefined>(undefined);

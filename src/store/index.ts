import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/authApi';
import { ingredientsApi } from './api/ingredientsApi';
import { ordersApi } from './api/orderApi';
import cartReducer from './slices/cartSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      ingredientsApi.middleware,
      ordersApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore, type Middleware } from '@reduxjs/toolkit';

import { authApi } from './api/authApi';
import { ingredientsApi } from './api/ingredientsApi';
import { ordersApi } from './api/orderApi';
import { ordersfeedApi } from './api/ordersfeedApi';
import { createWebSocketMiddleware } from './middleware/websocketMiddleware';
import cartReducer from './slices/cartSlice';
import modalReducer from './slices/modalSlice';
import ordersReducer, {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
} from './slices/ordersSlice';

const wsMiddleware: Middleware = createWebSocketMiddleware({
  onConnect: wsConnect,
  onDisconnect: wsDisconnect,
  onConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onMessage: wsMessage,
  onError: wsError,
});

export const store = configureStore({
  reducer: {
    [ingredientsApi.reducerPath]: ingredientsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ordersfeedApi.reducerPath]: ordersfeedApi.reducer,
    cart: cartReducer,
    modal: modalReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      ingredientsApi.middleware,
      ordersApi.middleware,
      ordersfeedApi.middleware,
      wsMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

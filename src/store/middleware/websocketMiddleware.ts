import { refreshToken } from '@/store/api/authApi';

import type { OrdersState } from '../slices/ordersSlice';
import type { RootState } from '@/store';
import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Dispatch,
  Middleware,
  MiddlewareAPI,
  UnknownAction,
} from '@reduxjs/toolkit';

type WebSocketActions = {
  onConnect: ActionCreatorWithPayload<{ url: string; withAuth?: boolean }>;
  onDisconnect: ActionCreatorWithoutPayload;
  onConnecting: ActionCreatorWithPayload<void>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<OrdersState>;
  onError: ActionCreatorWithPayload<string>;
};

type WsMessage = {
  success: boolean;
  orders: OrdersState['orders'];
  total: number;
  totalToday: number;
};

export function createWebSocketMiddleware({
  onConnect,
  onDisconnect,
  onConnecting,
  onOpen,
  onClose,
  onMessage,
  onError,
}: WebSocketActions): Middleware<unknown, RootState, Dispatch<UnknownAction>> {
  let socket: WebSocket | null = null;
  let isConnected = false;
  let reconnectTimer = 0;
  let currentUrl = '';
  let currentWithAuth = false;

  const getToken = (): string | null => {
    return localStorage.getItem('accessToken');
  };

  const handleReconnect = (
    store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>
  ): void => {
    if (isConnected) {
      store.dispatch(onConnecting());
      reconnectTimer = window.setTimeout(() => {
        store.dispatch(onConnect({ url: currentUrl, withAuth: currentWithAuth }));
      }, 3000);
    }
  };

  const handleTokenRefresh = async (
    store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>,
    wsUrl: string
  ): Promise<void> => {
    try {
      const newToken = await refreshToken();
      if (newToken && isConnected) {
        store.dispatch(onConnect({ url: wsUrl, withAuth: true }));
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      store.dispatch(onError('Failed to refresh token'));
    }
  };

  const setupSocketHandlers = (
    ws: WebSocket,
    store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>
  ): void => {
    ws.onopen = (): void => {
      store.dispatch(onOpen());
    };

    ws.onerror = (event: Event): void => {
      console.error('socket.onerror', event);
      store.dispatch(onError('WebSocket error'));
    };

    ws.onclose = async (event: CloseEvent): Promise<void> => {
      if (event.code !== 1000) {
        console.error('socket.onclose', event);

        if (currentWithAuth && (event.code === 1008 || event.code === 4001)) {
          await handleTokenRefresh(store, currentUrl);
          return;
        }

        store.dispatch(onError(event.code.toString()));
      }

      store.dispatch(onClose(event.code.toString()));
      handleReconnect(store);
    };

    ws.onmessage = (event: MessageEvent): void => {
      try {
        if (typeof event.data !== 'string') {
          console.warn('Received non-string message:', event.data);
          return;
        }
        const parsedData = JSON.parse(event.data) as WsMessage;
        if (parsedData.success) {
          const ordersState: OrdersState = {
            orders: parsedData.orders || [],
            total: parsedData.total || 0,
            totalToday: parsedData.totalToday || 0,
            isConnected: true,
            error: null,
            status: 'online',
          };
          store.dispatch(onMessage(ordersState));
        } else {
          console.warn('Received unsuccessful message:', parsedData);
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
        store.dispatch(onError('Failed to parse message'));
      }
    };
  };

  return ((store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>) =>
    (next: Dispatch<UnknownAction>) =>
    async (action: UnknownAction): Promise<UnknownAction> => {
      if (action.type === onDisconnect.type) {
        isConnected = false;
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;

        if (socket) {
          socket.close(1000, 'User disconnected');
          socket = null;
        }
        return next(action);
      }

      if (action.type !== onConnect.type) {
        return next(action);
      }

      const payload = action.payload as { url: string; withAuth?: boolean };
      currentUrl = payload.url;
      currentWithAuth = payload.withAuth ?? false;

      try {
        let ws: WebSocket | null = null;

        if (currentWithAuth) {
          let token = getToken();

          if (!token) {
            token = await refreshToken();
            if (!token) {
              console.error('No token available for WebSocket connection');
              store.dispatch(onError('No authorization token'));
              return next(action);
            }
          }

          const urlObj = new URL(currentUrl);
          urlObj.searchParams.set('token', token.replace('Bearer ', ''));
          ws = new WebSocket(urlObj.toString());
        } else {
          ws = new WebSocket(currentUrl);
        }

        if (!ws) {
          store.dispatch(onError('Failed to create WebSocket'));
          return next(action);
        }

        socket = ws;
        isConnected = true;
        store.dispatch(onConnecting());

        setupSocketHandlers(ws, store);
      } catch (error) {
        console.error('WebSocket connection error:', error);
        store.dispatch(onError('Connection failed'));
      }

      return next(action);
    }) as Middleware<unknown, RootState, Dispatch<UnknownAction>>;
}

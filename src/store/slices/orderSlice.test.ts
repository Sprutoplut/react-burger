import { describe, it, expect } from 'vitest';

import ordersReducer, {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
  initialState,
  type OrdersState,
  type Order,
} from './ordersSlice';

describe('ordersSlice', () => {
  const mockOrder: Order = {
    _id: '123',
    ingredients: ['ing1', 'ing2'],
    status: 'done',
    number: 12345,
    createdAt: '2024-01-01T12:00:00.000Z',
    updatedAt: '2024-01-01T12:00:00.000Z',
  };

  describe('начальное состояние', () => {
    it('должен возвращать начальное состояние', () => {
      const state = ordersReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);
    });
  });

  describe('wsConnect', () => {
    it('должен устанавливать статус offline и сбрасывать ошибку', () => {
      const stateWithError: OrdersState = {
        ...initialState,
        status: 'online',
        error: 'Some error',
      };

      const action = wsConnect({ url: 'wss://test.com', withAuth: false });
      const state = ordersReducer(stateWithError, action);

      expect(state.status).toBe('offline');
      expect(state.error).toBeNull();
      expect(state.isConnected).toBe(false);
    });

    it('должен сохранять остальное состояние неизменным', () => {
      const stateWithOrders: OrdersState = {
        ...initialState,
        orders: [mockOrder],
        total: 100,
      };

      const action = wsConnect({ url: 'wss://test.com' });
      const state = ordersReducer(stateWithOrders, action);

      expect(state.orders).toEqual(stateWithOrders.orders);
      expect(state.total).toBe(stateWithOrders.total);
      expect(state.totalToday).toBe(stateWithOrders.totalToday);
    });

    it('должен принимать параметр withAuth', () => {
      const action = wsConnect({ url: 'wss://test.com', withAuth: true });
      const state = ordersReducer(initialState, action);

      expect(state.status).toBe('offline');
      expect(state.error).toBeNull();
    });
  });

  describe('wsDisconnect', () => {
    it('должен сбрасывать все состояние к начальному', () => {
      const connectedState: OrdersState = {
        orders: [mockOrder, mockOrder],
        total: 200,
        totalToday: 20,
        isConnected: true,
        error: null,
        status: 'online',
      };

      const action = wsDisconnect();
      const state = ordersReducer(connectedState, action);

      expect(state).toEqual(initialState);
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
      expect(state.isConnected).toBe(false);
      expect(state.error).toBeNull();
      expect(state.status).toBe('offline');
    });

    it('должен работать при уже отключенном состоянии', () => {
      const action = wsDisconnect();
      const state = ordersReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('wsConnecting', () => {
    it('должен устанавливать статус connecting', () => {
      const action = wsConnecting();
      const state = ordersReducer(initialState, action);

      expect(state.status).toBe('connecting');
      expect(state.isConnected).toBe(false);
      expect(state.error).toBeNull();
    });

    it('должен сбрасывать ошибку при подключении', () => {
      const stateWithError: OrdersState = {
        ...initialState,
        error: 'Connection error',
        status: 'offline',
      };

      const action = wsConnecting();
      const state = ordersReducer(stateWithError, action);

      expect(state.error).toBeNull();
      expect(state.status).toBe('connecting');
    });

    it('должен сохранять существующие заказы', () => {
      const stateWithOrders: OrdersState = {
        ...initialState,
        orders: [mockOrder],
        total: 50,
      };

      const action = wsConnecting();
      const state = ordersReducer(stateWithOrders, action);

      expect(state.orders).toEqual(stateWithOrders.orders);
      expect(state.total).toBe(stateWithOrders.total);
    });
  });

  describe('wsOpen', () => {
    it('должен устанавливать статус online и подключать', () => {
      const action = wsOpen();
      const state = ordersReducer(initialState, action);

      expect(state.status).toBe('online');
      expect(state.isConnected).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сбрасывать ошибку при открытии соединения', () => {
      const stateWithError: OrdersState = {
        ...initialState,
        error: 'Some error',
        status: 'offline',
      };

      const action = wsOpen();
      const state = ordersReducer(stateWithError, action);

      expect(state.error).toBeNull();
      expect(state.status).toBe('online');
      expect(state.isConnected).toBe(true);
    });

    it('должен сохранять существующие заказы', () => {
      const stateWithOrders: OrdersState = {
        ...initialState,
        orders: [mockOrder],
        total: 50,
      };

      const action = wsOpen();
      const state = ordersReducer(stateWithOrders, action);

      expect(state.orders).toEqual(stateWithOrders.orders);
      expect(state.total).toBe(stateWithOrders.total);
    });
  });

  describe('wsClose', () => {
    it('должен отключать и сохранять код ошибки', () => {
      const action = wsClose('1000');
      const state = ordersReducer(initialState, action);

      expect(state.isConnected).toBe(false);
      expect(state.error).toBe('1000');
    });

    it('должен сохранять заказы при закрытии', () => {
      const stateWithOrders: OrdersState = {
        ...initialState,
        orders: [mockOrder],
        total: 50,
        isConnected: true,
        status: 'online',
      };

      const action = wsClose('1006');
      const state = ordersReducer(stateWithOrders, action);

      expect(state.orders).toEqual(stateWithOrders.orders);
      expect(state.total).toBe(stateWithOrders.total);
      expect(state.isConnected).toBe(false);
      expect(state.error).toBe('1006');
    });

    it('должен обрабатывать разные коды закрытия', () => {
      const codes = ['1000', '1001', '1006', '1011', '4001'];

      codes.forEach((code) => {
        const action = wsClose(code);
        const state = ordersReducer(initialState, action);
        expect(state.error).toBe(code);
        expect(state.isConnected).toBe(false);
      });
    });
  });

  describe('wsError', () => {
    it('должен устанавливать статус offline и сохранять ошибку', () => {
      const action = wsError('Connection failed');
      const state = ordersReducer(initialState, action);

      expect(state.status).toBe('offline');
      expect(state.isConnected).toBe(false);
      expect(state.error).toBe('Connection failed');
    });

    it('должен обрабатывать разные сообщения об ошибках', () => {
      const errors = [
        'Network error',
        'Authorization failed',
        'Server error',
        'Timeout',
      ];

      errors.forEach((errorMessage) => {
        const action = wsError(errorMessage);
        const state = ordersReducer(initialState, action);
        expect(state.error).toBe(errorMessage);
        expect(state.status).toBe('offline');
        expect(state.isConnected).toBe(false);
      });
    });

    it('должен сохранять заказы при ошибке', () => {
      const stateWithOrders: OrdersState = {
        ...initialState,
        orders: [mockOrder],
        total: 50,
        isConnected: true,
        status: 'online',
      };

      const action = wsError('Connection lost');
      const state = ordersReducer(stateWithOrders, action);

      expect(state.orders).toEqual(stateWithOrders.orders);
      expect(state.total).toBe(stateWithOrders.total);
      expect(state.status).toBe('offline');
      expect(state.isConnected).toBe(false);
    });
  });

  describe('wsMessage', () => {
    it('должен обновлять заказы и статистику', () => {
      const payload: OrdersState = {
        orders: [mockOrder, { ...mockOrder, _id: '456', number: 67890 }],
        total: 250,
        totalToday: 25,
        isConnected: true,
        error: null,
        status: 'online',
      };

      const action = wsMessage(payload);
      const state = ordersReducer(initialState, action);

      expect(state.orders).toEqual(payload.orders);
      expect(state.orders).toHaveLength(2);
      expect(state.total).toBe(250);
      expect(state.totalToday).toBe(25);
    });

    it('должен обновлять заказы на пустой массив', () => {
      const payload: OrdersState = {
        ...initialState,
        orders: [],
        total: 0,
        totalToday: 0,
      };

      const action = wsMessage(payload);
      const state = ordersReducer(initialState, action);

      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });

    it('должен корректно обновлять существующие заказы', () => {
      const initialStateWithOrders: OrdersState = {
        ...initialState,
        orders: [mockOrder],
        total: 100,
        totalToday: 10,
      };

      const newOrder: Order = {
        ...mockOrder,
        _id: '789',
        number: 99999,
        status: 'pending',
      };

      const payload: OrdersState = {
        orders: [newOrder],
        total: 50,
        totalToday: 5,
        isConnected: true,
        error: null,
        status: 'online',
      };

      const action = wsMessage(payload);
      const state = ordersReducer(initialStateWithOrders, action);

      expect(state.orders).toEqual([newOrder]);
      expect(state.orders).toHaveLength(1);
      expect(state.total).toBe(50);
      expect(state.totalToday).toBe(5);
    });

    it('должен обрабатывать большие массивы заказов', () => {
      const manyOrders = Array.from({ length: 100 }, (_, i) => ({
        ...mockOrder,
        _id: `order-${i}`,
        number: 10000 + i,
      }));

      const payload: OrdersState = {
        orders: manyOrders,
        total: 10000,
        totalToday: 100,
        isConnected: true,
        error: null,
        status: 'online',
      };

      const action = wsMessage(payload);
      const state = ordersReducer(initialState, action);

      expect(state.orders).toHaveLength(100);
      expect(state.total).toBe(10000);
      expect(state.totalToday).toBe(100);
    });
  });

  describe('последовательность действий', () => {
    it('должен корректно обрабатывать полный цикл подключения', () => {
      let state = ordersReducer(undefined, { type: 'unknown' });
      expect(state.status).toBe('offline');
      expect(state.isConnected).toBe(false);

      state = ordersReducer(state, wsConnect({ url: 'wss://test.com' }));
      expect(state.status).toBe('offline');

      state = ordersReducer(state, wsConnecting());
      expect(state.status).toBe('connecting');

      state = ordersReducer(state, wsOpen());
      expect(state.status).toBe('online');
      expect(state.isConnected).toBe(true);

      const messagePayload: OrdersState = {
        orders: [mockOrder],
        total: 100,
        totalToday: 10,
        isConnected: true,
        error: null,
        status: 'online',
      };
      state = ordersReducer(state, wsMessage(messagePayload));
      expect(state.orders).toHaveLength(1);
      expect(state.total).toBe(100);

      state = ordersReducer(state, wsDisconnect());
      expect(state).toEqual(initialState);
    });

    it('должен корректно обрабатывать ошибки во время работы', () => {
      let state = ordersReducer(undefined, { type: 'unknown' });

      state = ordersReducer(state, wsConnect({ url: 'wss://test.com' }));
      state = ordersReducer(state, wsConnecting());
      state = ordersReducer(state, wsOpen());

      const messagePayload: OrdersState = {
        orders: [mockOrder],
        total: 100,
        totalToday: 10,
        isConnected: true,
        error: null,
        status: 'online',
      };
      state = ordersReducer(state, wsMessage(messagePayload));

      expect(state.orders).toHaveLength(1);
      expect(state.status).toBe('online');

      state = ordersReducer(state, wsError('Connection lost'));
      expect(state.status).toBe('offline');
      expect(state.isConnected).toBe(false);
      expect(state.error).toBe('Connection lost');
      expect(state.orders).toHaveLength(1);
    });

    it('должен корректно обрабатывать закрытие соединения', () => {
      let state = ordersReducer(undefined, { type: 'unknown' });

      state = ordersReducer(state, wsConnect({ url: 'wss://test.com' }));
      state = ordersReducer(state, wsConnecting());
      state = ordersReducer(state, wsOpen());

      const messagePayload: OrdersState = {
        orders: [mockOrder],
        total: 100,
        totalToday: 10,
        isConnected: true,
        error: null,
        status: 'online',
      };
      state = ordersReducer(state, wsMessage(messagePayload));

      state = ordersReducer(state, wsClose('1000'));
      expect(state.isConnected).toBe(false);
      expect(state.error).toBe('1000');
      expect(state.orders).toHaveLength(1);
    });
  });
});

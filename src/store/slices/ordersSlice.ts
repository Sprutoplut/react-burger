import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Order = {
  ingredients: string[];
  _id: string;
  status: 'done' | 'pending' | 'created';
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type OrdersState = {
  orders: Order[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
  status: 'connecting' | 'online' | 'offline';
};

export const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null,
  status: 'offline',
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    wsConnect: (state, _action: PayloadAction<{ url: string; withAuth?: boolean }>) => {
      state.status = 'offline';
      state.error = null;
    },
    wsDisconnect: (state) => {
      state.status = 'offline';
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.isConnected = false;
      state.error = null;
    },
    wsConnecting: (state) => {
      state.status = 'connecting';
      state.isConnected = false;
      state.error = null;
    },
    wsOpen: (state) => {
      state.status = 'online';
      state.isConnected = true;
      state.error = null;
    },
    wsClose: (state, action: PayloadAction<string>) => {
      state.isConnected = false;
      state.error = action.payload;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.status = 'offline';
      state.isConnected = false;
      state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<OrdersState>) => {
      const payload = action.payload;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    },
  },
});

export const {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} = ordersSlice.actions;

export default ordersSlice.reducer;

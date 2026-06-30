import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './authApi';

import type { OrderResponse } from '@/utils/types';

type OrderRequest = {
  ingredients: string[];
};

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    createOrder: builder.mutation<OrderResponse, OrderRequest>({
      query: (data) => ({
        url: 'orders',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;

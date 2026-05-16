import { API_URL } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { OrderResponse } from '@/utils/types';

type OrderRequest = {
  ingredients: string[];
};

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
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

import { API_URL } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Order } from '../slices/ordersSlice';

type TOrderResponse = {
  order: Order;
  success: boolean;
};

export const ordersfeedApi = createApi({
  reducerPath: 'ordersfeedApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getOrder: builder.query<Order, string>({
      query: (orderId: string) => `/orders/${orderId}`,
      transformResponse: (response: TOrderResponse): Order => {
        return response.success ? response.order : ({} as Order);
      },
    }),
  }),
});

export const { useGetOrderQuery } = ordersfeedApi;

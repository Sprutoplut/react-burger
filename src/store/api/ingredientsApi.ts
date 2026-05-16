import { API_URL } from '@/utils/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TIngredient } from '@/utils/types';

type TIngredientsResponse = {
  data: TIngredient[];
  success: boolean;
};

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => '/ingredients',
      transformResponse: (response: TIngredientsResponse): TIngredient[] => {
        return response.success ? response.data : [];
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;

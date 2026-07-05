import { API_URL } from '@/utils/constants';
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type AuthResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
};

type RefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

type UserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

type ResetPasswordRequest = {
  password: string;
  token: string;
};

type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

type LogoutResponse = {
  success: boolean;
  message?: string;
};

export const refreshToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    });

    const data = (await response.json()) as RefreshTokenResponse;

    if (data.success) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return data.accessToken;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

const isAuthError = (error: unknown): error is FetchBaseQueryError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error.status === 401 || error.status === 403)
  );
};

let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 1;

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    isAuthError(result.error) &&
    refreshAttempts < MAX_REFRESH_ATTEMPTS
  ) {
    refreshAttempts++;
    console.log(`Refresh attempt ${refreshAttempts}/${MAX_REFRESH_ATTEMPTS}`);

    const newAccessToken = await refreshToken();

    if (newAccessToken) {
      result = await baseQuery(args, api, extraOptions);
      console.log('Retry request result:', result);

      if (!result.error) {
        refreshAttempts = 0;
      }
    }
  }

  if (result.error && isAuthError(result.error)) {
    console.log('Authentication failed, redirecting to login');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    refreshAttempts = 0;

    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: AuthResponse) => {
        if (response.success) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return response;
      },
      invalidatesTags: ['User'],
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: AuthResponse) => {
        if (response.success) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        return response;
      },
      invalidatesTags: ['User'],
    }),

    getUser: builder.query<UserResponse, void>({
      query: () => '/auth/user',
      providesTags: ['User'],
    }),

    logout: builder.mutation<void, void>({
      query: () => {
        const refreshToken = localStorage.getItem('refreshToken');
        return {
          url: '/auth/logout',
          method: 'POST',
          body: { token: refreshToken },
        };
      },
      transformResponse: (response: LogoutResponse) => {
        if (response?.success) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
        return undefined;
      },
    }),

    updateUser: builder.mutation<UserResponse, Partial<RegisterRequest>>({
      query: (body) => ({
        url: '/auth/user',
        method: 'PATCH',
        body,
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: '/password-reset',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: '/password-reset/reset',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;

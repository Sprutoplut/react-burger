import { useGetUserQuery } from '@/store/api/authApi';
import { useEffect, useCallback } from 'react';

type UseAuthReturn = {
  isAuthenticated: boolean;
  user: {
    email: string;
    name: string;
  } | null;
  isLoading: boolean;
  refetch: () => void;
};

export const useAuth = (): UseAuthReturn => {
  const hasToken = !!localStorage.getItem('accessToken');

  const {
    data,
    error,
    isLoading,
    isUninitialized,
    refetch: originalRefetch,
  } = useGetUserQuery(undefined, {
    skip: !hasToken,
  });

  const refetch = useCallback((): void => {
    void originalRefetch();
  }, [originalRefetch]);

  useEffect(() => {
    const performRefetch = async (): Promise<void> => {
      if (hasToken && (isUninitialized || error)) {
        try {
          await originalRefetch();
        } catch (err) {
          console.error('Refetch failed:', err);
        }
      }
    };

    void performRefetch();
  }, [hasToken, isUninitialized, error, originalRefetch]);

  const isLoadingAuth = hasToken && (isLoading || isUninitialized);

  const isAuthenticated = !!data?.success && !error;
  const user = data?.user ?? null;

  return {
    isAuthenticated,
    user,
    isLoading: isLoadingAuth,
    refetch,
  };
};

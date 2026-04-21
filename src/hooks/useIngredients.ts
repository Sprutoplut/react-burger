import { API_URL } from '@/utils/constants';
import { useState } from 'react';

import type { TIngredient } from '@/utils/types';

type TuseIngredient = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
  getIngredients: () => Promise<void>;
};

type TIngredientsResponse = {
  data: TIngredient[];
  success: boolean;
};

export const useIngredient = (): TuseIngredient => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getIngredients = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/ingredients`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as TIngredientsResponse;
      console.log(data);
      if (Array.isArray(data.data)) {
        setIngredients(data.data);
      } else {
        console.warn('Ответ API не является массивом. Используем пустой массив.');
        setIngredients([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      setIngredients([]);
    } finally {
      setLoading(false);
    }
  };

  return { ingredients, loading, error, getIngredients };
};

import { RoutesWithModal } from '@/router/routesWithModal';
import { useGetIngredientsQuery } from '@/store/api/ingredientsApi';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from '../error-boundary/error-boundary';
import { Error } from '../error/error';
import { Loader } from '../loader/loader';

export const App = (): React.JSX.Element => {
  const { error, isLoading } = useGetIngredientsQuery();

  if (error) {
    return <Error text="Ошибка получения данных" />;
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RoutesWithModal />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

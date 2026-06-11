import { RoutesWithModal } from '@/router/routesWithModal';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from '../error-boundary/error-boundary';

export const App = (): React.JSX.Element => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RoutesWithModal />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

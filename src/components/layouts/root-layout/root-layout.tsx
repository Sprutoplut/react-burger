import { Header } from '@/components/global-header/global-header';
import { Outlet } from 'react-router-dom';

import styles from '../../app/app.module.css';

export const RootLayout = (): React.JSX.Element => {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
    </div>
  );
};

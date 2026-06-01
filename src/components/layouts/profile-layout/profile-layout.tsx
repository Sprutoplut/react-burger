import { useWindowSize } from '@/hooks/useWindowSize';
import { useLogoutMutation } from '@/store/api/authApi';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

import styles from './profile-layout.module.css';

export const ProfileLayout = (): React.JSX.Element => {
  const { screenType } = useWindowSize();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent): void => {
    e.preventDefault();
    void performLogout();
  };

  const performLogout = async (): Promise<void> => {
    try {
      await logout().unwrap();
      void navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className={`${styles.profile} pl-4 mt-30`}>
      {screenType === 'desktop' && (
        <div className={styles.profile_links}>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `text text_type_main-medium ${styles.link} ${isActive && styles.link_active}`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `text text_type_main-medium ${styles.link} ${isActive && styles.link_active}`
            }
          >
            История заказов
          </NavLink>
          <button
            onClick={handleLogout}
            className={`text text_type_main-medium ${styles.link} mb-20`}
          >
            Выход
          </button>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      )}

      <Outlet />
    </div>
  );
};

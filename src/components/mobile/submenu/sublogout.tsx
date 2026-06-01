import { useLogoutMutation } from '@/store/api/authApi';
import { useNavigate } from 'react-router-dom';

export const LogoutItem = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = (e: { preventDefault: () => void }): void => {
    e.preventDefault();

    logout()
      .unwrap()
      .catch((err) => {
        console.error('Logout failed:', err);
      })
      .finally(() => {
        void navigate('/', { replace: true });
      });
  };

  return (
    <div
      className={`text text_type_main-default text_color_inactive ml-2`}
      onClick={handleLogout}
      style={{ cursor: 'pointer' }}
    >
      Выход
    </div>
  );
};

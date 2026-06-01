import { useAuth } from '@/hooks/useAuth';
import { useUpdateUserMutation } from '@/store/api/authApi';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react';

import styles from '../pages.module.css';

export const ProfilePage = (): React.JSX.Element => {
  const { user, refetch } = useAuth();
  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [initialData, setInitialData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name || '',
        email: user.email || '',
        password: '',
      };
      setFormData(userData);
      setInitialData(userData);
    }
  }, [user]);

  useEffect(() => {
    const isChanged =
      formData.name !== initialData.name ||
      formData.email !== initialData.email ||
      !!formData.password !== !!initialData.password;

    setHasChanges(isChanged);
  }, [formData, initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    void submitForm();
  };

  const submitForm = async (): Promise<void> => {
    const updateData: { name?: string; email?: string; password?: string } = {};

    if (formData.name !== initialData.name) {
      updateData.name = formData.name;
    }
    if (formData.email !== initialData.email) {
      updateData.email = formData.email;
    }
    if (formData.password && formData.password !== initialData.password) {
      updateData.password = formData.password;
    }

    if (Object.keys(updateData).length === 0) {
      setHasChanges(false);
      return;
    }

    try {
      const result = await updateUser(updateData).unwrap();

      if (result.success && result.user) {
        setInitialData({
          name: result.user.name,
          email: result.user.email,
          password: '',
        });
        setFormData({
          name: result.user.name,
          email: result.user.email,
          password: '',
        });
        setHasChanges(false);
        void refetch();
      }
    } catch (err) {
      console.error('Update profile failed:', err);
    }
  };

  const handleCancel = (): void => {
    setFormData({ ...initialData });
    setHasChanges(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        type="text"
        placeholder="Имя"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        name="email"
        type="email"
        placeholder="Логин"
        value={formData.email}
        onChange={handleChange}
      />

      <PasswordInput
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
      />

      {hasChanges && (
        <div className={styles.profile_save}>
          <Button htmlType="submit">Сохранить</Button>
          <Button htmlType="button" onClick={handleCancel} type="secondary">
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfilePage;

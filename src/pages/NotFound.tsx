import styles from './pages.module.css';

export const NotFound = (): React.JSX.Element => {
  return (
    <div className={styles.not_found}>
      <h1 className="text text_type_digits-large">404</h1>
      <p className="text text_type_main-large">Страница не найдена</p>
    </div>
  );
};

import styles from './modal-overlay.module.css';

type TModalOverlay = {
  onClick?: () => void;
};

export const ModalOverlay = ({ onClick }: TModalOverlay): React.JSX.Element | null => {
  return <div className={styles.overlay} onClick={onClick} />;
};

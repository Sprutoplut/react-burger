import { ModalOverlay } from '../modal-window/modal-overlay/modal-overlay';

import styles from './error.module.css';

type TError = {
  text: string;
};

export const Error = ({ text }: TError): React.JSX.Element => {
  return (
    <>
      <ModalOverlay />
      <div className={styles.error}>
        <h1 className="text text_type_main-large">{text}</h1>
      </div>
    </>
  );
};

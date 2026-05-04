import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { ModalOverlay } from '../modal-window/modal-overlay/modal-overlay';

import styles from './loader.module.css';

export const Loader = (): React.JSX.Element => {
  return (
    <>
      <ModalOverlay />
      <div className={styles.preloader}>
        <Preloader />
      </div>
    </>
  );
};

import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './mobile-head.module.css';

type TMMobileHead = {
  onClose: () => void;
  title: string;
};

export const MobileHead = ({ onClose, title }: TMMobileHead): React.JSX.Element => {
  return (
    <div className={`${styles.head_open} pb-4 pt-4 pr-2`}>
      <h1 className="text text_type_main-large">{title}</h1>
      <CloseIcon type="primary" onClick={onClose} />
    </div>
  );
};

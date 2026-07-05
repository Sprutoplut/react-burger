import styles from './feed-column.module.css';

type TFeedColumn = {
  title: number;
  text: string;
};

export const FeedColumn = ({ title, text }: TFeedColumn): React.JSX.Element => {
  return (
    <div className={styles.feed_column}>
      <p className="text text_type_main-medium">{text}</p>
      <p className="text text_type_digits-large">{title}</p>
    </div>
  );
};

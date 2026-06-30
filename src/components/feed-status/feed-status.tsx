import styles from './feed-status.module.css';

type TFeedStatus = {
  ready: boolean;
  numbers: number[];
};

export const FeedStatus = ({ ready, numbers }: TFeedStatus): React.JSX.Element => {
  return (
    <div className={styles.feed_container_numbers}>
      <p className="text text_type_main-medium mb-6">
        {ready ? 'Готовы:' : 'В работе:'}
      </p>
      <div className={styles.feed_numbers}>
        {numbers.map((number) => (
          <p
            className={`text text_type_digits-default ${ready ? styles.feed_ready_numbers : styles.feed_pending_numbers}`}
            key={number}
          >
            {number}
          </p>
        ))}
      </div>
    </div>
  );
};

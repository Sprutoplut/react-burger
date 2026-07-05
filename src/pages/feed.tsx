import { FeedCard } from '@/components/feed-card/feed-card';
import { FeedColumn } from '@/components/feed-column/feed-column';
import { FeedStatus } from '@/components/feed-status/feed-status';
import { Loader } from '@/components/loader/loader';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { wsConnect, wsDisconnect } from '@/store/slices/ordersSlice';
import { useEffect } from 'react';

import styles from './pages.module.css';

export const Feed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday, status } = useAppSelector((state) => state.orders);

  useEffect(() => {
    const url = `wss://new-stellarburgers.education-services.ru/orders/all`;
    dispatch(
      wsConnect({
        url: url,
        withAuth: false,
      })
    );

    return (): void => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .slice(0, 10)
    .map((order) => order.number);

  const inProgressOrders = orders
    .filter((order) => order.status === 'pending' || order.status === 'created')
    .slice(0, 10)
    .map((order) => order.number);
  if (status === 'connecting' || status === 'offline') return <Loader />;
  return (
    <>
      <h1 className={`text text_type_main-large ml-10 mt-10 mb-5 ${styles.feed_title}`}>
        Лента заказов
      </h1>
      <div className={styles.feed_container}>
        <div className={styles.feed_list}>
          {orders.map((order) => (
            <FeedCard order={order} key={order.number} />
          ))}
        </div>
        <div className={styles.feed_info}>
          <div className={styles.feed_row}>
            <FeedStatus ready={true} numbers={readyOrders} />
            <FeedStatus ready={false} numbers={inProgressOrders} />
          </div>
          <FeedColumn title={total} text="Выполнено за все время:" />
          <FeedColumn title={totalToday} text="Выполнено за сегодня:" />
        </div>
      </div>
    </>
  );
};

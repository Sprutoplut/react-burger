import { FeedCard } from '@/components/feed-card/feed-card';
import { Loader } from '@/components/loader/loader';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { wsConnect, wsDisconnect } from '@/store/slices/ordersSlice';
import { useEffect } from 'react';

import styles from '../pages.module.css';
export const Orders = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.orders);

  useEffect(() => {
    const wsUrl = `wss://new-stellarburgers.education-services.ru/orders`;
    dispatch(
      wsConnect({
        url: wsUrl,
        withAuth: true,
      })
    );

    return (): void => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);
  if (status === 'connecting' || status === 'offline') return <Loader />;
  return (
    <div className={styles.orders_list}>
      {orders
        .slice()
        .sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((order) => (
          <FeedCard order={order} key={order.number} />
        ))}
    </div>
  );
};

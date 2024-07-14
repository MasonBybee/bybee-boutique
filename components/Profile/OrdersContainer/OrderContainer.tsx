import React, { useEffect, useState, useTransition } from "react";
import styles from "./OrderContainer.module.css";
import Loading from "@/components/Loading";
import { getOrders } from "@/actions/orderActions";
import { ExtendedSession } from "@/lib/session";
import { OrderValues } from "@/lib/types";
import OrderItems from "./OrderElement";

interface OrdersProps {
  user: ExtendedSession;
}

const OrderContainer: React.FC<OrdersProps> = ({ user }) => {
  const [orders, setOrders] = useState<OrderValues[]>();
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      if (user) {
        getOrders(user.userId as number).then((dbOrders) => {
          if (dbOrders) {
            setOrders(dbOrders);
          }
        });
      }
    });
  }, []);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Orders</h2>
      <div className={styles.orderContainer}>
        {orders &&
          orders.map((order) => {
            return <OrderItems key={order.id} order={order} />;
          })}
        {!orders && <h4 className={styles.noOrders}>No Orders To Display</h4>}
      </div>
    </div>
  );
};

export default OrderContainer;

import React, { useEffect, useState, useTransition } from "react";
import styles from "./Order.module.css";
import Loading from "@/components/Loading";
import { getOrders } from "@/actions/orderActions";
import { Order } from "@/lib/schema/Order";
import { ExtendedSession } from "@/lib/session";

interface OrdersProps {
  user: ExtendedSession;
}

const Orders: React.FC<OrdersProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      if (user) {
        getOrders(user.userId as number).then((dbOrders) => {
          // setOrders(dbOrders);
        });
      }
    });
  }, []);

  if (isPending) {
    return <Loading />;
  }

  if (!orders) {
    <h2>No Orders to display!</h2>;
  }
  return (
    <div>
      <h2>Orders</h2>
      <div className={styles.OrderContainer}>{}</div>
    </div>
  );
};

export default Orders;

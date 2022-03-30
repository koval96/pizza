import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import Loader from "../../utils/Loader";
import OrderCard from "./OrderCard";

import { GET_ALL_ORDERS } from "../../gql/queries/getAllOrders";

function AdminPanel() {
  const [orders, setOrders] = useState();
  const { loading } = useQuery(GET_ALL_ORDERS, {
    onCompleted: (data) => {
      setOrders(data.getAllOrders);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Ошибка при загрузке заказов");
    },
  });

  return (
    <>
      <Loader loading={loading} />
      {orders &&
        orders.map((order, idx) => {
          return (
            <>
              <Link to={`/admin/order/${order.id}`}>
                  <h3 className="mt-4">
                      Заказ {order.id}
                  </h3>
              </Link>
              <OrderCard order={order} isAdmin={true} key={idx} />
            </>
          );
        })}
    </>
  );
}

export default AdminPanel;

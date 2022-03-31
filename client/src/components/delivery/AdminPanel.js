import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import Loader from "../../utils/Loader";
import OrderCard from "./OrderCard";

import { GET_ALL_ORDERS } from "../../gql/queries/getAllOrders";

function AdminPanel() {
  const [orders, setOrders] = useState();
  const [activeOrders, setActiveOrders] = useState();
  const [uncompletedOrders, setUncompletedOrders] = useState(true);
  const { loading } = useQuery(GET_ALL_ORDERS, {
    onCompleted: (data) => {
      setOrders(data.getAllOrders);
      setActiveOrders(data.getAllOrders);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Ошибка при загрузке заказов");
    },
  });

  useEffect(() => {
    if (orders) {
      if (uncompletedOrders) {
        setActiveOrders(orders.filter((order) => order.status !== "доставлен"));
      } else {
        setActiveOrders(orders);
      }
    }
  }, [uncompletedOrders, orders]);

  return (
    <>
      <Loader loading={loading} />
      <div className="d-flex">
        <input
          type="checkbox"
          id={"uncompleted"}
          className="ingredient__checkbox"
          onChange={() => setUncompletedOrders(!uncompletedOrders)}
          checked={uncompletedOrders}
        />
        <label htmlFor={"uncompleted"} className="ms-2">
          <b>Отображать только невыполненные заказы</b>
        </label>
      </div>
      {activeOrders &&
        activeOrders.map((order, idx) => {
          return (
            <div key={idx}>
              <Link to={`/admin/order/${order.id}`}>
                <h3 className="mt-4">Заказ {order.id}</h3>
              </Link>
              <OrderCard order={order} isAdmin={true} key={idx} />
            </div >
          );
        })}
    </>
  );
}

export default AdminPanel;

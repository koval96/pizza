import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { ORDER } from "../../gql/mutations/order";
import toast from "react-hot-toast";

import { UserContext } from "../auth/AuthLayer";
import { GlobalContext } from "../../App";
import { MapDiv } from "../map/Map";

function DeliveryForm({ orders, setOrders, setItems }) {
  const [phone, setPhone] = useState();
  const [adress, setAdress] = useState();
  const { user, setUser } = useContext(UserContext);
  const { setOrdersCount } = useContext(GlobalContext);

  const [order, { loading }] = useMutation(ORDER, {
    onCompleted: (data) => {
      if (orders) {
        setOrders([
          ...orders.filter((order) => order !== data.order.order.id),
          data.order.order,
        ]);
      } else {
        setOrders([
          data.order.order,
        ]);
      }
      if (!user.username) {
        localStorage.setItem(
          "orders",
          JSON.stringify([
            data.order.order,
            ...JSON.parse(localStorage.getItem("orders")),
          ])
        );
        localStorage.setItem("cart", JSON.stringify([]));
      } else {
        setUser({ ...user, orders: [data.order.order, ...user.orders], cart: [] });
      }
      setOrdersCount(0);
      setItems([]);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Ошибка при оформлении заказа");
    },
  });

  return (
    <div className="delivery mt-4">
      <h1>Доставка</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          order({
            variables: {
              adress,
              phone,
              pizzas: user.username
                ? JSON.stringify(user.cart)
                : localStorage.getItem("cart"),
              username: user.username ? user.username : null,
            },
          });
        }}
      >
        <input
          type="tel"
          className="default__input delivery__input"
          placeholder="Телефон"
          defaultValue={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <MapDiv setAdress={setAdress} />
        <input
          type="text"
          className="default__input delivery__input"
          placeholder="Адрес"
          defaultValue={adress}
          onChange={(e) => setAdress(e.target.value)}
          required
        />
        <button className="default__btn">Заказать</button>
      </form>
    </div>
  );
}

export default DeliveryForm;

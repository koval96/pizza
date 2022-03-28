import { useState, useEffect, useContext } from "react";

import PizzaCart from "../pizza/PizzaCart";
import DeliveryForm from "../delivery/DeliveryForm";
import OrderCard from "../delivery/OrderCard";

import "../../static/css/order.css";

import { UserContext } from "../auth/AuthLayer";

function Cart() {
  const [items, setItems] = useState();
  const [orders, setOrders] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!localStorage.getItem("orders")) {
      localStorage.setItem("orders", JSON.stringify([]))
    }
  }, [])

  useEffect(() => {
    if (!user.username) {
      const cartList = localStorage.getItem("cart");
      const orderList = localStorage.getItem("orders");
      if (cartList) {
        setItems(
          JSON.parse(cartList).sort((a, b) => {
            return a.id - b.id;
          })
        );
      }

      if (orderList) {
        setOrders(JSON.parse(orderList));
      } else {
        setOrders([])
      }
    } else {
      setItems(user.cart);
      setOrders(user.orders);
    }
  }, [user]);
  return (
    <div className="cart">
      <h1>Корзина</h1>
      {items &&
        items.map((item, idx) => {
          return (
            <PizzaCart
              items={items}
              setItems={setItems}
              item={item}
              key={idx}
            />
          );
        })}

      {items && items.length == 0 && <p>В корзине ничего нет</p>}
      {items && items.length !== 0 && (
        <DeliveryForm
          orders={orders}
          setOrders={setOrders}
          setItems={setItems}
        />
      )}

      <h1 className="mt-4">Ваши заказы</h1>

      {orders && orders.length == 0 && <p>Заказов нет</p>}

      {orders && orders.map((order, idx) => {
        return (
          <OrderCard order={order} key={idx} />
        )
      })}
    </div>
  );
}

export default Cart;

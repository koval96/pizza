import { useState, useEffect, useContext } from "react";

import PizzaCart from "../pizza/PizzaCart";

import "../../static/css/order.css";

import { UserContext } from '../auth/AuthLayer'

function Cart() {
  const [items, setItems] = useState();
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user.username) {
      const cartList = localStorage.getItem("cart");
      if (cartList) {
        setItems(
          JSON.parse(cartList).sort((a, b) => {
            return a.id - b.id;
          })
        );
      }
    } else {
      setItems(user.cart)
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
    </div>
  );
}

export default Cart;

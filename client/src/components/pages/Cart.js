import { useState, useEffect } from "react";

import PizzaCart from "../pizza/PizzaCart";

import "../../static/css/order.css";

function Cart() {
  const [items, setItems] = useState();
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setItems(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);
  return (
    <div className="cart">
      <h1>Корзина</h1>
      {items &&
        items.map((item, idx) => {
          return (
            <PizzaCart item={item} key={idx} />
          )
        })}
      {!items && <p>В корзине ничего нет</p>}
    </div>
  );
}

export default Cart;

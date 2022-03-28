import { useState } from "react";

import PizzaCartControls from "./PizzaCartControls";

import pizza from "../../static/images/pizza.png";

function PizzaCart({ item, items, setItems }) {
  const [counter, setCounter] = useState(1);
  return (
    <div className="pizza__cart mt-2 rel">
      <div className="d-flex align-items-center pizza_cart__container">
        <img src={pizza} alt="pizza" width="120px" />
        <div className="pizza__details ms-4">
          <p className="pizza__name">{item.name}</p>
          <p>
            <span>
              <b>Ингридиенты: </b>
            </span>
            {item.ingredients.map((ingredient, idx) => {
              return (
                <span key={idx}>
                  {ingredient.name}
                  {idx !== item.ingredients.length - 1 && ","}{" "}
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <PizzaCartControls
        item={item}
        items={items}
        setItems={setItems}
        counter={counter}
        setCounter={setCounter}
      />
    </div>
  );
}

export default PizzaCart;

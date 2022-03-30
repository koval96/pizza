import { useState } from "react";

import PizzaCartControls from "./PizzaCartControls";
import PizzaImage from "./PizzaImage";

import pizza from "../../static/images/pizza.png";

function PizzaCart({ item, items, setItems }) {
  const [counter, setCounter] = useState(1);
  return (
    <div className="pizza__cart mt-2 rel">
      <div className="d-flex align-items-center pizza_cart__container">
        <PizzaImage ingredients={item.ingredients} width={"120px"} />
        <div className="pizza__details ms-4">
          <div className="d-flex">
            <p className="pizza__name">
              {item.name !== "" ? item.name : "Кастомная пицца"}
            </p>
            <p
              className="pizza__size"
            >
              {item.size}
            </p>
            <p
              className="pizza__size ms-1"
            >
              {item.slices}
            </p>
          </div>
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

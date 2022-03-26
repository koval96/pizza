import { useContext } from "react";

import { HomeContext } from "../pages/Home";

import al from "../../static/images/arrow_left.svg";
import ar from "../../static/images/arrow_right.svg";

function SliderControl({ direction }) {
  const { activePizza, setActivePizza, pizzas } = useContext(HomeContext);

  const paginate = () => {
    const currIndex = pizzas.findIndex((pizza) => pizza.id == activePizza.id);
    if (direction) {
      if (currIndex == pizzas.length - 1) {
        setActivePizza(pizzas[0]);
      } else {
        setActivePizza(pizzas[currIndex + 1]);
      }
    } else {
      if (currIndex == 0) {
        setActivePizza(pizzas[pizzas.length - 1]);
      } else {
        setActivePizza(pizzas[currIndex - 1]);
      }
    }
  };

  return (
    <div className="slider__control" onClick={() => paginate()}>
      <img src={direction ? ar : al} alt="" />
    </div>
  );
}

export default SliderControl;

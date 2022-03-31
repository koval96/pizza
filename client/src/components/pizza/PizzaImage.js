import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

import IngredientImage from "../pizza/IngredientImage";
import PizzaDivider from "./PizzaDivider";
import basePizza from "../../static/images/bare_pizza.png";

function PizzaImage({ pizza, ingredients, width, size, slices }) {
  const [loaded, setLoaded] = useState(0);
  const loc = useLocation()

  useEffect(() => {
    if (ingredients.length < loaded - 1) {
      setLoaded(ingredients.length + 1);
    }
  }, [ingredients, loaded]);

  return (
    <div className="d-flex justify-content-center">
      <div
        className={`pizza__container ${!width && "w-100"} ${size && size} rel`}
      >
        <div
          className={`${
            loaded == ingredients.length + 1 ? "d-block" : "d-none"
          }`}
        >
          <img
            src={basePizza}
            alt=""
            width={width ? width : "100%"}
            onLoad={() => setLoaded(loaded + 1)}
          />
          {slices && <PizzaDivider slices={slices} />}
          {ingredients.map((ingredient, idx) => {
            return (
              <IngredientImage
                ingredient={ingredient}
                key={idx}
                width={width}
                loaded={loaded}
                setLoaded={setLoaded}
              />
            );
          })}
        </div>
        {!(loaded == ingredients.length + 1) && (
          <div className="pizza__loader">
            <div className="spinner-border text-light" role="status"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PizzaImage;

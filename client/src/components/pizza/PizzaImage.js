import { useEffect } from "react";

import IngredientImage from "../pizza/IngredientImage";
import basePizza from "../../static/images/bare_pizza.png";

function PizzaImage({ ingredients, width }) {
  return (
    <div className="d-flex justify-content-center">
      <div className={`pizza__container ${!width && "w-100"} rel`}>
        <img src={basePizza} alt="" width={width ? width : "100%"} />
        {ingredients.map((ingredient, idx) => {
          return (
            <IngredientImage ingredient={ingredient} key={idx} width={width} />
          );
        })}
      </div>
    </div>
  );
}

export default PizzaImage;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import tomatoSauce from "../../static/images/tomato_sauce.png";
import tomato from "../../static/images/tomato.png";
import backon from "../../static/images/backon.png";
import salat from "../../static/images/salat.png";
import cheese_sauce from "../../static/images/cheese_sauce.png";
import mustard_sauce from "../../static/images/mustard_sauce.png";
import mushrooms from "../../static/images/mushrooms.png";
import shamp from "../../static/images/shamp.png";
import meat from "../../static/images/meat.png";
import sausages from "../../static/images/sausages.png";
import olives from "../../static/images/olives.png";
import masl from "../../static/images/masl.png";
import rukola from "../../static/images/rukula.png";
import rozm from "../../static/images/rozmarin.png";

function IngredientImage({ ingredient, width }) {
  const [img, setImg] = useState();
  const loc = useLocation().pathname.split("/");
  useEffect(() => {
    if (ingredient.name == "томатный соус") {
      setImg(tomatoSauce);
    }
    if (ingredient.name == "томаты") {
      setImg(tomato);
    }
    if (ingredient.name == "бекон") {
      setImg(backon);
    }
    if (ingredient.name == "салат") {
      setImg(salat);
    }
    if (ingredient.name == "сырный соус") {
      setImg(cheese_sauce);
    }
    if (ingredient.name == "горчичный соус") {
      setImg(mustard_sauce);
    }
    if (ingredient.name == "шампиньоны") {
      setImg(shamp);
    }
    if (ingredient.name == "грибы") {
      setImg(mushrooms);
    }
    if (ingredient.name == "мясо") {
      setImg(meat);
    }
    if (ingredient.name == "колбаски") {
      setImg(sausages);
    }
    if (ingredient.name == "оливки") {
      setImg(olives);
    }
    if (ingredient.name == "маслины") {
      setImg(masl);
    }
    if (ingredient.name == "рукола") {
      setImg(rukola);
    }
    if (ingredient.name == "розмарин") {
      setImg(rozm);
    }
  }, [ingredient]);
  return (
    <motion.div
      initial={{ opacity: loc.includes("edit") ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={`ingredient__container ${
        ingredient.type == "sauce" ? "sauce__ingredient" : "only__ingredient"
      }`}
    >
      <img src={img} alt="" width={width ? width : "100%"} />
    </motion.div>
  );
}

export default IngredientImage;

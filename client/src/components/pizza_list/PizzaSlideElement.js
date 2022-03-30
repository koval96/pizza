import { motion } from "framer-motion";

import PizzaImage from "../pizza/PizzaImage";
import AboutPizza from "../pizza/AboutPizza";

function PizzaSlideElement({ activePizza: pizza }) {
  return (
    <motion.div
      className="pizza_list__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, transition: 2 }}
    >
      <PizzaImage ingredients={pizza.ingredients} />
      <AboutPizza pizza={pizza} />
    </motion.div>
  );
}

export default PizzaSlideElement;

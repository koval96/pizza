import { motion } from "framer-motion";

import Pizza from "../pizza/Pizza";
import AboutPizza from "../pizza/AboutPizza";

function PizzaSlideElement({ activePizza: pizza }) {
  return (
    <motion.div
      className="pizza_list__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, transition: 2 }}
    >
      <Pizza pizza={pizza} />
      <AboutPizza pizza={pizza} />
    </motion.div>
  );
}

export default PizzaSlideElement;

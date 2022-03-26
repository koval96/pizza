import React, { useState } from "react";
import PizzaSlide from "../pizza_list/PizzaSlide";

import "../../static/css/home.css";

export const HomeContext = React.createContext();

function Home() {
  const [pizzas, setPizzas] = useState([
    {
      id: 1,
      title: "Мясная пицца",
      ingredients: "тесто, салат, томатный соус, сыр",
    },
    {
      id: 2,
      title: "Грибная пицца",
      ingredients: "тесто, грибы, сырный соус, томаты",
    },
  ]);
  const [activePizza, setActivePizza] = useState({
    id: 1,
    title: "Мясная пицца",
    ingredients: "тесто, салат, томатный соус, сыр",
  });

  return (
    <HomeContext.Provider
      value={{
        pizzas,
        setPizzas,
        activePizza,
        setActivePizza,
      }}
    >
      <PizzaSlide activePizza={activePizza} />
    </HomeContext.Provider>
  );
}

export default Home;

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";

import PizzaSlide from "../pizza_list/PizzaSlide";
import Loader from "../../utils/Loader";
import "../../static/css/home.css";

import { GET_ALL_PIZZAS } from "../../gql/queries/getAllPizzas";

export const HomeContext = React.createContext();

function Home() {
  const [pizzas, setPizzas] = useState();
  const [activePizza, setActivePizza] = useState();
  const { loading } = useQuery(GET_ALL_PIZZAS, {
    onCompleted: (data) => {
      setPizzas(data.getAllPizzas);
      setActivePizza(data.getAllPizzas[0]);
    },
    onError: (err) => {
      toast.error("Ошибка при загрузке пицц");
    },
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
      <Loader loading={loading} />
      {activePizza && <PizzaSlide activePizza={activePizza} />}
    </HomeContext.Provider>
  );
}

export default Home;

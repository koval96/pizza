import { useState, useEffect, useContext } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";

import Loader from "../../utils/Loader";
import PizzaImage from "../pizza/PizzaImage";
import SizeChanger from "../pizza/SizeChanger";

import "../../static/css/edit.css";

import { GET_PIZZA_BY_ID } from "../../gql/queries/getPizzaById";
import { GET_ALL_INGREDIENTS } from "../../gql/queries/getAllIngredients";
import { CREATE_PIZZA_FROM_CART } from "../../gql/mutations/createPizzaForCart";
import { ADD_TO_CART } from "../../gql/mutations/addToCart";

import { UserContext } from "../auth/AuthLayer";
import { GlobalContext } from "../../App";

function EditPizza() {
  const [pizzaIngredients, setPizzaIngredients] = useState();
  const [pizza, setPizza] = useState();
  const [ingredients, setIngredients] = useState();
  const [slices, setSlices] = useState(8);
  const [size, setSize] = useState("M");
  const { user, setUser } = useContext(UserContext);
  const { setOrdersCount } = useContext(GlobalContext);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id && parseInt(id) !== 0) {
      getPizza();
    } else {
      setPizzaIngredients([]);
      setPizza({ name: "", ingredients: [], size: "m" });
    }
  }, [id]);

  const [addToCart, { loading: addToCartLoading }] = useMutation(ADD_TO_CART, {
    onCompleted: (data) => {
      setUser({ ...user, cart: data.addToCart.cart });
      history.push("/cart");
    },
    onError: (err) => {
      console.log(err)
      toast.error("Произошла ошибка");
    },
  });

  const [createPizza, { loading: createLoading }] = useMutation(
    CREATE_PIZZA_FROM_CART,
    {
      onCompleted: (data) => {
        const pizzaTemp = data.createPizzaForCart.pizza;
        setPizza(pizzaTemp);
        if (!user.username) {
          localStorage.setItem(
            "cart",
            JSON.stringify([
              ...JSON.parse(localStorage.getItem("cart")).filter(
                (p) => p.id !== pizzaTemp.id
              ),
              pizzaTemp,
            ])
          );
          setOrdersCount(JSON.parse(localStorage.getItem("cart")).length);
          history.push("/cart");
        } else {
          if (user.cart.filter((i) => i.id == pizzaTemp.id).length == 0) {
            addToCart({
              variables: {
                id: pizzaTemp.id,
                username: user.username,
              },
            });
          }
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const [getPizza, { loading }] = useLazyQuery(GET_PIZZA_BY_ID, {
    variables: {
      id,
    },
    onCompleted: (data) => {
      setPizzaIngredients(data.getPizzaById.ingredients);
      setPizza(data.getPizzaById);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { loading: loadingIngredients } = useQuery(GET_ALL_INGREDIENTS, {
    variables: {
      id,
    },
    onCompleted: (data) => {
      setIngredients([
        ...data.getAllIngredients.filter((i) => i.type == "sauce"),
        ...data.getAllIngredients.filter((i) => i.type !== "sauce"),
      ]);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <>
      <Loader
        loading={
          loading || loadingIngredients || createLoading || addToCartLoading
        }
      />
      {!loading && !loadingIngredients && pizzaIngredients ? (
        <div className="edit_pizza__container row">
          <div className="ingredients__container col-md-6 col-sm-12 order-2 rel">
            <h1>Ингридиенты</h1>
            <div className="ingredients__scrollable">
              {ingredients &&
                ingredients.map((ingredient, idx) => {
                  return (
                    <div className="d-flex mt-2" key={idx}>
                      <input
                        type="checkbox"
                        className="ingredient__checkbox"
                        id={idx}
                        onChange={(e) => {
                          const items = e.target.checked
                            ? [...pizzaIngredients, ingredient]
                            : [
                                ...pizzaIngredients.filter(
                                  (i) => i.name !== ingredient.name
                                ),
                              ];
                          setPizzaIngredients(items);
                        }}
                        checked={
                          pizzaIngredients.filter(
                            (i) => i.name == ingredient.name
                          ).length !== 0
                        }
                      />
                      <label className="ingredient" htmlFor={idx}>
                        {ingredient.name.charAt(0).toUpperCase() +
                          ingredient.name.slice(1)}
                      </label>
                    </div>
                  );
                })}
            </div>
            <div className="mt-4">
              <SizeChanger size={size} setSize={setSize} />
              <h4>
                <label className="mt-4" htmlFor="slices">
                  Кол-во кусков
                </label>
              </h4>
              <input
                id={"slices"}
                type="number"
                className="default__input"
                min="1"
                defaultValue={slices}
                onChange={(e) => {
                  e.target.value < 0
                    ? (e.target.value = 1)
                    : setSlices(e.target.value)
                }}
                placeholder="Кол-во кусков"
              />
              <button
                className="default__btn mt-2 mb-4"
                onClick={() => {
                  createPizza({
                    variables: {
                      name: pizza.name,
                      slices,
                      size,
                      ingredients: JSON.stringify(pizzaIngredients),
                    },
                  });
                }}
              >
                Добавить в корзину
              </button>
            </div>
          </div>
          <div className="pizza_img__container col-md-6 col-sm-12 order-md-2">
            <PizzaImage ingredients={pizzaIngredients} />
          </div>
        </div>
      ) : (
        <Loader loading={loading || loadingIngredients} />
      )}
    </>
  );
}

export default EditPizza;

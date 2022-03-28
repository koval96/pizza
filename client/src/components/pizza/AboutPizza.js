import { useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import pen from "../../static/images/pen.svg";
import love from "../../static/images/love.svg";

import Loader from "../../utils/Loader";
import { GlobalContext } from "../../App";
import { UserContext } from "../auth/AuthLayer";

import { ADD_TO_CART } from "../../gql/mutations/addToCart";

function AboutPizza({ pizza }) {
  const { setOrdersCount } = useContext(GlobalContext);
  const { user, setUser } = useContext(UserContext);

  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    onCompleted: (data) => {
      console.log(user.cart, data.addToCart.cart)
      setUser({ ...user, cart: data.addToCart.cart });
    },
    onError: (err) => {
      toast.error("Произошла ошибка");
    },
  });

  return (
    <>
      <Loader loading={loading} />
      <div className="text-center mt-3">
        <p className="heading__regular">{pizza.name}</p>
        <p>
          <span>
            <b>Ингридиенты: </b>
          </span>
          {pizza.ingredients.map((ingredient, idx) => {
            return (
              <span key={idx}>
                {ingredient.name}
                {idx !== pizza.ingredients.length - 1 && ","}{" "}
              </span>
            );
          })}
        </p>
        <div className="d-flex justify-content-center btn_group__pizza">
          <button
            className="default__btn order__btn"
            onClick={() => {
              if (!user.username) {
                localStorage.setItem(
                  "cart",
                  JSON.stringify([
                    ...JSON.parse(localStorage.getItem("cart")).filter(
                      (p) => p.id !== pizza.id
                    ),
                    pizza,
                  ])
                );
                setOrdersCount(JSON.parse(localStorage.getItem("cart")).length);
              } else {
                if (!user.cart || (user.cart && user.cart.filter((i) => i.name == pizza.name).length == 0)) {
                  addToCart({
                    variables: {
                      id: pizza.id,
                      username: user.username,
                    },
                  });
                }
              }
            }}
          >
            {user.username
              ? user.cart && user.cart.filter((i) => i.name == pizza.name).length !== 0
                ? "В корзине"
                : "Добавить в корзину"
              : JSON.parse(localStorage.getItem("cart")).filter(
                  (i) => i.name == pizza.name
                ).length > 0
              ? "В корзине"
              : "Добавить в корзину"}
          </button>
          <button className="default__btn">
            <img src={pen} alt="pen" />
          </button>
          <button className="default__btn">
            <img src={love} alt="love" />
          </button>
        </div>
      </div>
    </>
  );
}

export default AboutPizza;

import { useContext } from "react";

import pen from "../../static/images/pen.svg";
import love from "../../static/images/love.svg";

import { GlobalContext } from '../../App'

function AboutPizza({ pizza }) {
  const { setOrdersCount } = useContext(GlobalContext)

  return (
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
            localStorage.setItem(
              "cart",
              JSON.stringify(
                [...JSON.parse(localStorage.getItem("cart")).filter(p => p.id !== pizza.id), pizza]
              )
            );
            setOrdersCount(JSON.parse(localStorage.getItem("cart")).length)
          }}
        >
          Добавить в корзину
        </button>
        <button className="default__btn">
          <img src={pen} alt="pen" />
        </button>
        <button className="default__btn">
          <img src={love} alt="love" />
        </button>
      </div>
    </div>
  );
}

export default AboutPizza;

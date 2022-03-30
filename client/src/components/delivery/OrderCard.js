import pizzaImg from "../../static/images/pizza.png";
import QRCode from 'qrcode.react';
function OrderCard({ order }) {
  return (
    <div className="pizza_order__card">
      <p><b>Адрес:</b> {order.adress}</p>
      {order.pizzas.map((pizza, idx) => {
        return (
          <div className="pizza_order_entity__card" key={idx}>
            <div className="d-flex align-items-center pizza_cart__container">
              <img src={pizzaImg} alt="pizza" width="120px" />
              <QRCode value="https://reactjs.org/" renderAs="canvas" />,
              <div className="pizza__details ms-4">
                <p className="pizza__name">{pizza.name}</p>
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderCard;

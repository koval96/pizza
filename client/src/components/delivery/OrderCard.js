import PizzaImage from "../pizza/PizzaImage";

function OrderCard({ order, isAdmin }) {
  return (
    <div className="pizza_order__card">
      <p>
        <b>Адрес:</b> {order.adress}
      </p>
      <p>
        <b>Телефон:</b> {order.phone}
      </p>
      <p>
        Статус заказа: <b>{order.status}</b>
      </p>
      {order.pizzas.map((pizza, idx) => {
        return (
          <div className="pizza_order_entity__card" key={idx}>
            <div className="d-flex align-items-center pizza_cart__container">
              <PizzaImage ingredients={pizza.ingredients} width={"120px"} />
              <div className="pizza__details ms-4 pizza_cart__container">
                <div className="d-flex">
                  <p className="pizza__name">
                    {pizza.name !== "" ? pizza.name : "Кастомная пицца"}
                  </p>
                  <p className="pizza__size">{pizza.size}</p>
                  <p className="pizza__size ms-1">{pizza.slices}</p>
                </div>
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

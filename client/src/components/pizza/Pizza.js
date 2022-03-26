import pizza from "../../static/images/pizza.png";

function Pizza() {
  return (
    <div className="pizza__container">
      <img src={pizza} alt="" width="100%" />
    </div>
  );
}

export default Pizza;

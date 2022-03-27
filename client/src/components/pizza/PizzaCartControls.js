import trash from "../../static/images/trash.svg";

function PizzaCartControls({ counter, setCounter }) {
  return (
    <div className="d-flex align-items-center">
      <div className="me-4">
        <p className="counter__number">140₽</p>
      </div>
      <div className="counter d-flex me-4">
        <span
          className="counter__symbol me-2"
          onClick={() => {
            counter > 1 && setCounter(counter - 1);
          }}
        >
          -
        </span>
        <span className="counter__number">{counter}</span>
        <span
          className="counter__symbol ms-2"
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          +
        </span>
      </div>
      <img src={trash} alt="" width="20px" />
    </div>
  );
}

export default PizzaCartControls;

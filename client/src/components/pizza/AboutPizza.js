import pen from '../../static/images/pen.svg'
import love from '../../static/images/love.svg'

function AboutPizza({ pizza }) {
  return (
    <div className="text-center mt-3">
      <p className="heading__regular">{ pizza.title }</p>
      <p>
        <span>
          <b>Ингридиенты: </b>
        </span>
        { pizza.ingredients }
      </p>
      <div className="d-flex justify-content-center btn_group__pizza">
        <button className="default__btn order__btn">
          Заказать сейчас
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

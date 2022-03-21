import pen from '../../static/images/pen.svg'
import love from '../../static/images/love.svg'

function AboutPizza() {
  return (
    <div className="text-center mt-3">
      <p className="heading__regular">Мясная пицца</p>
      <p>
        <span>
          <b>Ингридиенты: </b>
        </span>
        тесто, салат, томатный соус, сыр
      </p>
      <div className="d-flex justify-content-center btn_group__pizza">
        <button className="default__btn default__btn_dark">
          Заказать сейчас
        </button>
        <button className="default__btn default__btn_dark">
          <img src={pen} alt="pen" />
        </button>
        <button className="default__btn default__btn_dark">
        <img src={love} alt="love" />
        </button>
      </div>
    </div>
  );
}

export default AboutPizza;

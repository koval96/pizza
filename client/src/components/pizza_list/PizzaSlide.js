import SliderControl from "./SliderControl";
import Pizza from "../pizza/Pizza";
import AboutPizza from "../pizza/AboutPizza";

function PizzaSlide() {
  return (
    <div className="slider">
      {/* false direction - left, true direction - right */}
      <SliderControl direction={false} />
      <div className="pizza_list__container">
        <Pizza />
        <AboutPizza />
      </div>
      <SliderControl direction={true} />
    </div>
  );
}

export default PizzaSlide;

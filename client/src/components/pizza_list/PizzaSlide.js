import SliderControl from "./SliderControl";
import PizzaSlideElement from "./PizzaSlideElement";

function PizzaSlide({ activePizza }) {
  return (
    <div className="slider">
      {/* false direction - left, true direction - right */}
      <SliderControl direction={false} />
      <PizzaSlideElement activePizza={activePizza} />
      <SliderControl direction={true} />
    </div>
  );
}

export default PizzaSlide;

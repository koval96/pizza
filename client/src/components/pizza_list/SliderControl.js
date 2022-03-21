import al from "../../static/images/arrow_left.svg";
import ar from "../../static/images/arrow_right.svg";

function SliderControl({ direction }) {
  return (
    <>
      <img src={direction ? ar : al} alt="" />
    </>
  );
}

export default SliderControl;

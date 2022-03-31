function PizzaDivider({ slices }) {
  return (
    <div className="pizza__divider">
      <div className="vertical__line"></div>
      {(slices == 4 || slices == 8) && (
        <div className="vertical__line horizontal__line"></div>
      )}
      {slices == 6 && (
        <>
          <div className="vertical__line diagonal__line diagonal__line_6"></div>
          <div
            className="vertical__line diagonal__line"
            style={{ transform: "rotate(-60deg)" }}
          ></div>
        </>
      )}
      {slices == 8 && (
        <>
          <div className="vertical__line diagonal__line"></div>
          <div
            className="vertical__line diagonal__line"
            style={{ transform: "rotate(-45deg)" }}
          ></div>
        </>
      )}
    </div>
  );
}

export default PizzaDivider;

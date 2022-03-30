function SizeChanger({ size, setSize }) {
  return (
    <>
      <h4>
        <label>Размер пиццы</label>
      </h4>
      <div className="size_changer__container">
        <p
          className={`size_changer__item ${
            size == "S" ? "size_changer__item_active" : ""
          }`}
          onClick={() => setSize("S")}
        >
          S
        </p>
        <p
          className={`size_changer__item ms-1 ${
            size == "M" ? "size_changer__item_active" : ""
          }`}
          onClick={() => setSize("M")}
        >
          M
        </p>
        <p
          className={`size_changer__item ms-1 ${
            size == "L" ? "size_changer__item_active" : ""
          }`}
          onClick={() => setSize("L")}
        >
          L
        </p>
      </div>
    </>
  );
}

export default SizeChanger;

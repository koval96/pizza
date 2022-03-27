function Loader({ loading }) {
  return (
    <>
      {loading && (
        <>
          <div className="cover__screen"></div>
          <div className="loader spinner-border text-light" role="status"></div>
        </>
      )}
    </>
  );
}

export default Loader;

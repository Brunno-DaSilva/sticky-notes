const Color = ({ color }) => {
  const changeColor = () => {
    console.log("CHange color clicked:", color);
  };

  return (
    <div
      onClick={changeColor}
      className="color"
      style={{ backgroundColor: color.colorHeader }}
    ></div>
  );
};

export default Color;

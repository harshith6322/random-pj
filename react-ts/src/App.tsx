import { useState } from "react";

function App(): JSX.Element {
  const style = { color: "red", fontSize: "48px" };

  return (
    <div>
      <h1 className="main">app</h1>
      <p style={style}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis,
        assumenda exceptur
      </p>
      <Comp1 />
      <Comp2 />
    </div>
  );
}
const Comp1 = function () {
  return <div>comp1</div>;
};

const Comp2 = () => {
  return <div>COMP2</div>;
};

export default App;

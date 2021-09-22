import React from "react";
import { useState } from "react";
const Work = () => {
  const [count, setCount] = useState(25);

  const handleIncrease = () => {
    console.log("increase");
    setCount(count + 1);
  };
  const handleDecrease = () => {
    console.log("decrease");
    if (count >= 1) {
      setCount(count - 1);
    }
  };
  return (
    <div>
      <div className="title">Work time</div>
      <div className="time-grid">
        <div className="time-adjust">
          <div>{count}:00</div>
        </div>
        <div className="interval-grid">
          <div>Change time interval</div>
          <div className="interval-changer">
            <button onClick={handleIncrease}>Increase</button>
            <button onClick={handleDecrease}>Decrease</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

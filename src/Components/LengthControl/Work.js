import React from "react";
const Work = (props) => {
  const handleIncrease = () => {
    props.handleWork("increase");
  };
  const handleDecrease = () => {
    props.handleWork("decrease");
  };
  return (
    <div>
      <div className="title">Work time</div>
      <div className="time-grid">
        <div className="time-adjust">
          <div>{props.workTime}:00</div>
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

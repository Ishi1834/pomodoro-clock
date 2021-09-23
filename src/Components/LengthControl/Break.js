import React from "react";
const Break = (props) => {
  const handleIncrease = () => {
    props.handleBreak("increase");
  };
  const handleDecrease = () => {
    props.handleBreak("decrease");
  };
  return (
    <div>
      <div className="title">Break time</div>
      <div className="time-grid">
        <div className="time-adjust">
          <div>{props.breakTime}:00</div>
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

export default Break;

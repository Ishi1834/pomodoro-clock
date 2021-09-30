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
      <div className="title" id="break-label">
        Break Length
      </div>
      <div className="time-grid">
        <div className="time-adjust">
          <div id="break-length">{props.breakTime}</div>
        </div>
        <div className="interval-grid">
          <div className="change-title">Change time interval</div>
          <div className="interval-changer">
            <button
              onClick={handleIncrease}
              id="break-increment"
              className="button-style"
            >
              Increase
            </button>
            <button
              onClick={handleDecrease}
              id="break-decrement"
              className="button-style"
            >
              Decrease
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Break;

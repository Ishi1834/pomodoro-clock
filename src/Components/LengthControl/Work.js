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
      <div className="title" id="session-label">
        Session Length
      </div>
      <div className="time-grid">
        <div className="time-adjust">
          <div id="session-length">{props.workTime}</div>
        </div>
        <div className="interval-grid">
          <div className="change-title">Change time interval</div>
          <div className="interval-changer">
            <button
              onClick={handleIncrease}
              id="session-increment"
              className="button-style"
            >
              Increase
            </button>
            <button
              onClick={handleDecrease}
              id="session-decrement"
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

export default Work;

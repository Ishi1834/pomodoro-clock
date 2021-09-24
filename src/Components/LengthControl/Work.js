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
          <div>Change time interval</div>
          <div className="interval-changer">
            <button onClick={handleIncrease} id="session-increment">
              Increase
            </button>
            <button onClick={handleDecrease} id="session-decrement">
              Decrease
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;

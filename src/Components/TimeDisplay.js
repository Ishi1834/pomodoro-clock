import React from "react";

const TimeDisplay = (props) => {
  return (
    <div className="timer">
      <div>Work/Break toggle</div>
      <div className="time">
        <div>
          {props.timer ? props.countdownMin : props.workTime}:
          {props.countdownSec}
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;

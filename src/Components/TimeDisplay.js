import React from "react";

const TimeDisplay = (props) => {
  return (
    <div className="timer">
      <div id="timer-label">Work/Break toggle</div>
      <div className="time">
        <div id="time-left">
          {props.timer ? props.countdownMin : props.workTime}:00
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;

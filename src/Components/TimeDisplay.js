import React from "react";

const TimeDisplay = (props) => {
  return (
    <div className="timer">
      <div id="timer-label">
        {props.type === "session" ? "Work session" : "Break session"}
      </div>
      <div className="time">
        <div id="time-left">
          {props.timerDisplay !== ""
            ? props.timerDisplay
            : props.type === "session"
            ? props.workTime + ":00"
            : props.breakTime + ":00"}
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;

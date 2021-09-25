import React from "react";

const StartPause = (props) => {
  const handleClick = () => {
    props.timerOnOff();
  };
  return (
    <div>
      <button onClick={handleClick} id="start_stop">
        {props.startpause ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default StartPause;

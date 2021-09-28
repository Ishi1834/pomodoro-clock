import React from "react";

const StartPause = (props) => {
  const handleClick = () => {
    if (props.startpause === "Start") {
      props.timerOnOff("Start");
    } else {
      props.timerOnOff("Pause");
    }
  };
  return (
    <div>
      <button onClick={handleClick} id="start_stop">
        {props.startpause === "Start" ? "Start" : "Pause"}
      </button>
    </div>
  );
};

export default StartPause;

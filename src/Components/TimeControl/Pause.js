import React from "react";

const Pause = (props) => {
  const handleClick = () => {
    props.timerOff();
  };
  return (
    <div>
      <button onClick={handleClick}>Pause timer</button>
    </div>
  );
};

export default Pause;

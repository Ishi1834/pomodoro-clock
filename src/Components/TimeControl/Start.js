import React from "react";

const Start = (props) => {
  const handleClick = () => {
    props.timerOn();
  };
  return (
    <div>
      <button onClick={handleClick} id="start_stop">
        Start timer
      </button>
    </div>
  );
};

export default Start;

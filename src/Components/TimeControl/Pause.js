import React from "react";

const Pause = () => {
  const handleClick = () => {
    console.log("pause clicked");
  };
  return (
    <div>
      <button onClick={handleClick}>Pause timer</button>
    </div>
  );
};

export default Pause;

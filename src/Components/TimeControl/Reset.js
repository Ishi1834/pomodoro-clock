import React from "react";

const Reset = (props) => {
  const handleClick = () => {
    props.handleReset();
  };
  return (
    <div>
      <button onClick={handleClick}>Reset timer</button>
    </div>
  );
};

export default Reset;

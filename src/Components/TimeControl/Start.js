import React from "react";

const Start = () => {
  const handleClick = () => {
    console.log("start clicked");
  };
  return (
    <div>
      <button onClick={handleClick}>Start timer</button>
    </div>
  );
};

export default Start;

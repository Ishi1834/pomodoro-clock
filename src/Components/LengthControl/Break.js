import React from "react";

const Break = () => {
  return (
    <div>
      <div>Break time</div>
      <div className="time-grid">
        <div className="time">
          <div>Time in minutes</div>
          <div>Time in seconds</div>
        </div>
        <div className="interval-grid">
          <div>Change time interval</div>
          <div className="interval-changer">
            <button>Increase</button>
            <button>Decrease</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Break;

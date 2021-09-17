import React from "react";
import TimeDisplay from "./Components/TimeDisplay";
import Work from "./Components/LengthControl/Work";
import Break from "./Components/LengthControl/Break";
import Start from "./Components/TimeControl/Start";
import Pause from "./Components/TimeControl/Pause";
import Reset from "./Components/TimeControl/Reset";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="components">
      <div className="topcomp">
        <Work />
        <Break />
      </div>
      <TimeDisplay />
      <div className="bottomcomp">
        <Start />
        <Pause />
        <Reset />
      </div>
      <Footer className="footer" />
    </div>
  );
};

export default App;

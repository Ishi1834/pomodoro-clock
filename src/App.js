import TimeDisplay from "./Components/TimeDisplay";
import Work from "./Components/LengthControl/Work";
import Break from "./Components/LengthControl/Break";
import Start from "./Components/TimeControl/Start";
import Pause from "./Components/TimeControl/Pause";
import Reset from "./Components/TimeControl/Reset";
import Footer from "./Components/Footer";
/*
const App = () => {
  const handleReset = () => {
    console.log("reset requested");
    //pass reset function to child
  };
  return (
    <div className="components">
      <div className="web-title">Pomodoro Clock</div>
      <div className="topcomp">
        <Work />
        <Break />
      </div>
      <TimeDisplay />
      <div className="bottomcomp">
        <Start />
        <Pause />
        <Reset handleReset={handleReset} />
      </div>
      <Footer className="footer" />
    </div>
  );
};
*/

import { Component } from "react";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { workTime: 25, breakTime: 5 };
  }
  render() {
    const handleReset = () => {
      this.setState({ workTime: 25, breakTime: 5 });
    };
    const handleWork = (someVal) => {
      if (someVal === "increase") {
        this.setState({ workTime: this.state.workTime + 1 });
      } else if (this.state.workTime > 0) {
        this.setState({ workTime: this.state.workTime - 1 });
      }
    };
    const handleBreak = (someVal) => {
      if (someVal === "increase") {
        this.setState({ breakTime: this.state.breakTime + 1 });
      } else if (this.state.breakTime > 0) {
        this.setState({ breakTime: this.state.breakTime - 1 });
      }
    };
    return (
      <div className="components">
        <div className="web-title">Pomodoro Clock</div>
        <div className="topcomp">
          <Work {...this.state} handleWork={handleWork} />
          <Break {...this.state} handleBreak={handleBreak} />
        </div>
        <TimeDisplay />
        <div className="bottomcomp">
          <Start />
          <Pause />
          <Reset handleReset={handleReset} />
        </div>
        <Footer className="footer" />
      </div>
    );
  }
}

export default App;

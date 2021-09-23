import TimeDisplay from "./Components/TimeDisplay";
import Work from "./Components/LengthControl/Work";
import Break from "./Components/LengthControl/Break";
import Start from "./Components/TimeControl/Start";
import Pause from "./Components/TimeControl/Pause";
import Reset from "./Components/TimeControl/Reset";
import Footer from "./Components/Footer";

import { Component } from "react";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workTime: 25,
      breakTime: 5,
      countdownMin: 25,
      countdownSec: "00",
      timer: false,
    };
  }
  render() {
    const handleReset = () => {
      this.setState({ workTime: 25, breakTime: 5 });
    };
    const handleWork = (someVal) => {
      if (this.state.timer) return;
      if (someVal === "increase") {
        this.setState({ workTime: this.state.workTime + 1 });
      } else if (this.state.workTime > 0) {
        this.setState({ workTime: this.state.workTime - 1 });
      }
    };
    const handleBreak = (someVal) => {
      if (this.state.timer) return;
      if (someVal === "increase") {
        this.setState({ breakTime: this.state.breakTime + 1 });
      } else if (this.state.breakTime > 0) {
        this.setState({ breakTime: this.state.breakTime - 1 });
      }
    };
    const timer = () => {
      var now = new Date().getTime();
      var timeChoosen = this.state.countdownMin * 60000;
      var countDownTime = timeChoosen + now;
      var timeLeft = countDownTime - now;
      console.log(timeLeft);
    };
    const timerOn = () => {
      if (this.state.timer === false) {
        this.setState({ timer: true, countdownMin: this.state.workTime });
        console.log(this.state.countdownMin); // countDownMin isn't updating figure out the issue
        timer();
      }
    };
    const timerOff = () => {
      if (this.state.timer === true) {
        this.setState({ timer: false });
      }
    };
    return (
      <div className="components">
        <div className="web-title">Pomodoro Clock</div>
        <div className="topcomp">
          <Work {...this.state} handleWork={handleWork} />
          <Break {...this.state} handleBreak={handleBreak} />
        </div>
        <TimeDisplay {...this.state} />
        <div className="bottomcomp">
          <Start timerOn={timerOn} />
          <Pause timerOff={timerOff} />
          <Reset handleReset={handleReset} />
        </div>
        <Footer className="footer" />
      </div>
    );
  }
}

export default App;

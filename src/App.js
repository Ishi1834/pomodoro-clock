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
      countDownMilli: 0,
      timerState: "",
      timer: false,
    };
  }
  render() {
    const handleWork = (someVal) => {
      if (this.state.timer) return;
      if (someVal === "increase") {
        if (this.state.workTime < 60) {
          this.setState({ workTime: this.state.workTime + 1 });
        }
      } else if (this.state.workTime > 1) {
        this.setState({ workTime: this.state.workTime - 1 });
      }
    };
    const handleBreak = (someVal) => {
      if (this.state.timer) return;
      if (someVal === "increase" && this.state.breakTime <= 60) {
        if (this.state.breakTime < 60) {
          this.setState({ breakTime: this.state.breakTime + 1 });
        }
      } else if (this.state.breakTime > 1) {
        this.setState({ breakTime: this.state.breakTime - 1 });
      }
    };

    var countDownTime =
      new Date().getTime() +
      (this.state.countDownMilli === 0
        ? this.state.workTime
        : this.state.countDownMilli) *
        60000;

    var timer = () => {
      var now = new Date().getTime();

      var countDown = countDownTime - now;

      var minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((countDown % (1000 * 60)) / 1000);

      document.getElementById("time-left").innerHTML = minutes + ":" + seconds;
      if (countDown < 0) {
        clearInterval(timerId);
      } else if (this.state.timerState === "paused") {
        clearInterval(timerId);
        var countDownConv = (countDown % (1000 * 60 * 60)) / (1000 * 60);
        this.setState({ countDownMilli: countDownConv });
      } else if (this.state.timerState === "reset") {
        console.log("a reset");
        clearTimeout(timerId);
        document.getElementById("time-left").innerHTML =
          this.state.workTime + ":00";
        this.setState({ timerSate: "" });
      }
    };

    var timerId;
    if (this.state.timer) {
      timerId = setInterval(timer, 100);
    }

    const timerOn = () => {
      if (this.state.timer === false) {
        this.setState({
          timer: true,
          countdownMin: this.state.workTime,
          timerState: "playing",
        });
      }
    };
    const timerOff = () => {
      if (this.state.timer) {
        this.setState({ timer: false, timerState: "paused" }); // pause resets the timer
      }
    };
    const handleReset = () => {
      this.setState({
        workTime: 25,
        breakTime: 5,
        timer: false,
        timerState: "reset",
      });
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

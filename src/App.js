import TimeDisplay from "./Components/TimeDisplay";
import Work from "./Components/LengthControl/Work";
import Break from "./Components/LengthControl/Break";
import StartPause from "./Components/TimeControl/StartPause";
import Reset from "./Components/TimeControl/Reset";
import Footer from "./Components/Footer";
import { Component } from "react";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "session",
      workTime: 25,
      breakTime: 5,
      countDownMilli: 0,
      timerState: "",
      timer: false,
      startpause: false,
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
      (this.state.countDownMilli !== 0
        ? this.state.countDownMilli
        : this.state.type === "session"
        ? this.state.workTime
        : this.state.breakTime) *
        60000;

    var timer = () => {
      var now = new Date().getTime();

      var countDown = countDownTime - now;

      var minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((countDown % (1000 * 60)) / 1000);

      document.getElementById("time-left").innerHTML = minutes + ":" + seconds;
      if (seconds === 0) {
        clearInterval(timerId);
        if (this.state.type === "session") {
          this.setState({ type: "break" });
        } else if (this.state.type === "break") {
          handleReset();
        }
      } else if (this.state.timerState === "paused") {
        clearInterval(timerId);
        var countDownConv = (countDown % (1000 * 60 * 60)) / (1000 * 60);
        this.setState({ countDownMilli: countDownConv });
      } else if (this.state.timerState === "reset") {
        clearInterval(timerId);
        this.setState({
          type: "session",
          workTime: 25,
          breakTime: 5,
          countDownMilli: 0,
          timerState: this.state.timer === "reset" ? "" : "reset",
          timer: false,
          startpause: false,
        });
        document.getElementById("time-left").innerHTML =
          this.state.workTime + ":00";
      }
    };

    var timerId;
    if (this.state.timer) {
      timerId = setInterval(timer, 100);
    }

    const timerOnOff = () => {
      if (this.state.startpause) {
        this.setState({
          timer: !this.state.timer,
          timerState: "paused",
          startpause: !this.state.startpause,
        });
      } else {
        this.setState({
          timer: true,
          timerState: "playing",
          startpause: !this.state.startpause,
        });
      }
    };

    const handleReset = () => {
      this.setState({ timerState: "reset" });
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
          <StartPause timerOnOff={timerOnOff} {...this.state} />
          <Reset handleReset={handleReset} />
        </div>
        <Footer className="footer" />
      </div>
    );
  }
}

export default App;

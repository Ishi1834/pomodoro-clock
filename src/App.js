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
      startpause: "Start",
      timerDisplay: "",
    };
    this.handleWork = this.handleWork.bind(this);
    this.handleBreak = this.handleBreak.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.timerOnOff = this.timerOnOff.bind(this);
    this.timer = this.timer.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  handleWork(someVal) {
    if (this.state.timer) return;
    if (this.state.timerState === "paused") {
      clearInterval(this.timerId);
      this.setState({
        type: "session",
        workTime: this.state.workTime,
        breakTime: this.state.breakTime,
        countDownMilli: 0,
        timerState: "",
        timer: false,
        startpause: "Start",
        countDownTime: 0,
        timerDisplay: "",
      });
    } else {
      if (someVal === "increase") {
        if (this.state.workTime < 60) {
          this.setState({ workTime: this.state.workTime + 1 });
        }
      } else if (this.state.workTime > 1) {
        this.setState({ workTime: this.state.workTime - 1 });
      }
    }
  }
  handleBreak(someVal) {
    if (this.state.timer) return;
    if (this.state.timerState === "paused") {
      clearInterval(this.timerId);
      this.setState({
        type: "session",
        workTime: this.state.workTime,
        breakTime: this.state.breakTime,
        countDownMilli: 0,
        timerState: "",
        timer: false,
        startpause: "Start",
        countDownTime: 0,
        timerDisplay: "",
      });
    } else {
      if (someVal === "increase") {
        if (this.state.breakTime < 60) {
          this.setState({ breakTime: this.state.breakTime + 1 });
        }
      } else if (this.state.breakTime > 1) {
        this.setState({ breakTime: this.state.breakTime - 1 });
      }
    }
  }
  handleReset() {
    this.setState({ timerState: "reset" });
    clearInterval(this.timerId);
    this.setState({
      type: "session",
      workTime: 25,
      breakTime: 5,
      countDownMilli: 0,
      timerState: "",
      timer: false,
      startpause: "Start",
      countDownTime: 0,
      timerDisplay: "",
    });
  }
  timerOnOff() {
    if (this.state.startpause === "Start") {
      var countDownTime =
        new Date().getTime() +
        (this.state.countDownMilli !== 0
          ? this.state.countDownMilli
          : this.state.type === "session"
          ? this.state.workTime
          : this.state.breakTime) *
          60000;
      this.timerTrigger();
      this.setState({
        timer: !this.state.timer,
        timerState: "playing",
        startpause: "Pause",
        countDownTime: countDownTime,
      });
    } else if (
      this.state.timerDisplay === "00:00" &&
      this.state.type === "break"
    ) {
      console.log("Do it here");
      countDownTime = new Date().getTime() + this.state.breakTime * 60000;
      clearInterval(this.timerId);
      this.setState({
        timer: true,
        timerState: "playing",
        startpause: "Pause",
        countDownTime: countDownTime,
      });
      this.timerTrigger();
    } else if (
      this.state.timerDisplay === "00:00" &&
      this.state.type === "session"
    ) {
      console.log("Do it here");
      countDownTime = new Date().getTime() + this.state.workTime * 60000;
      clearInterval(this.timerId);
      this.setState({
        timer: true,
        timerState: "playing",
        startpause: "Pause",
        countDownTime: countDownTime,
      });
      this.timerTrigger();
    } else {
      clearInterval(this.timerId);
      this.setState({
        countDownMilli: this.state.pauseTimer,
        timer: false,
        timerState: "paused",
        startpause: "Start",
      });

      this.setState((prevstate) => ({
        prevWork: prevstate.workTime,
        prevBreak: prevstate.breakTime,
      }));
    }
  }
  handleSwitch() {
    if (this.state.timerDisplay === "00:00") {
      if (this.state.type === "session") {
        this.setState({ type: "break" });
        this.timerOnOff();
      } else {
        this.setState({ type: "session" });
        this.timerOnOff();
      }
    }
  }
  timerTrigger() {
    this.timerId = setInterval(this.timer, 100);
  }

  timer() {
    var now = new Date().getTime();

    var countDown = this.state.countDownTime - now;

    var minutesAA = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    var minutes =
      minutesAA < 10 && countDown < 600000 ? "0" + minutesAA : minutesAA; //countdown is redundant
    var secondsAA = Math.floor((countDown % (1000 * 60)) / 1000);
    var seconds = secondsAA < 10 ? "0" + secondsAA : secondsAA;
    var pauseTimer = (countDown % (1000 * 60 * 60)) / (1000 * 60);
    this.setState({
      timerDisplay: minutes + ":" + seconds,
      pauseTimer: pauseTimer,
      countDown: countDown,
    });
    console.log(minutes, countDown);
    this.handleSwitch();
  }

  /*from here
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
        this.setState((prevstate) => ({
          prevWork: prevstate.workTime,
          prevBreak: prevstate.breakTime,
        }));
      } else if (this.state.timerState === "reset") {
        clearInterval(timerId);
        document.getElementById("time-left").innerHTML =
          this.state.workTime + ":00";
      } else {
        //have the below function outside timer so it runs when the program start and updates accordingly
        if (
          this.state.prevWork !== this.state.workTime &&
          this.state.prevWork !== undefined
        ) {
          handleReset();
        } else if (
          this.state.prevBreak !== this.state.breakTime &&
          this.state.prevBreak !== undefined
        ) {
          handleReset();
        }
      }
    };

    var timerId;
    if (this.state.timer) {
      timerId = setInterval(timer, 100);
    }
    */

  render() {
    return (
      <div className="components">
        <div className="web-title">Pomodoro Clock</div>
        <div className="topcomp">
          <Work {...this.state} handleWork={this.handleWork} />
          <Break {...this.state} handleBreak={this.handleBreak} />
        </div>
        <TimeDisplay {...this.state} />
        <div className="bottomcomp">
          <StartPause {...this.state} timerOnOff={this.timerOnOff} />
          <Reset handleReset={this.handleReset} />
        </div>
        <Footer className="footer" />
      </div>
    );
  }
}

export default App;

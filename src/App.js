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
    this.playAudio = this.playAudio.bind(this);
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
    this.audioPlay.pause();
    this.audioPlay.currentTime = 0;
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
      this.playAudio();
      if (this.state.type === "session") {
        this.setState({ type: "break" });
        this.timerOnOff();
      } else {
        this.playAudio();
        this.setState({ type: "session" });
        this.timerOnOff();
      }
    }
  }
  timerTrigger() {
    this.timerId = setInterval(this.timer, 100);
  }

  timer() {
    if (this.state.timerDisplay === "00:00") {
      if (this.state.type === "session") {
        this.setState({
          timerDisplay: "0" + this.state.workTime + ":00",
        });
      } else if (this.state.type === "break") {
        this.setState({ timerDisplay: "0" + this.state.breakTime + ":00" });
      }
    } else {
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
    }
    this.handleSwitch();
  }
  playAudio() {
    const playPromise = this.audioPlay.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          console.log("audio played auto");
        })
        .catch((error) => {
          console.log("playback prevented");
        });
    }
  }

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
        <audio
          id="beep"
          preload="auto"
          hidden={true}
          ref={(audio) => {
            this.audioPlay = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          controls
        />
      </div>
    );
  }
}

export default App;

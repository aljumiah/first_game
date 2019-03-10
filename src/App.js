import React, { Component } from "react";
import img_1 from "./img/monster.gif";
import img_2 from "./img/punsh.png";
import "./App.css";
import "./animate.css";

class App extends Component {
  state = {
    inputValue: "",
    random: null,
    gameCheck: false,
    checkCloseMax: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    checkCloseMin: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    punshCount: 0,
    timer: 120
  };
  startover = () => {
    this.setState({ random: 0 });
  };
  startTiming = () => {
    this.interval = setInterval(this.timer, 1000);
  };

  timer = () => {
    this.setState({ timer: this.state.timer - 1 });
    if (this.state.timer <= 0) {
      clearInterval(this.interval);
    }
  };
  checkInputValue = number => {
    this.setState({ inputValue: number.target.value });
    this.gameCheck(number.target.value);
    this.checkClose(number.target.value);
  };

  newRandom = () => {
    //this.setState({ inputValue: newValue });
    let newRandomNumber = 0;
    newRandomNumber = Math.floor(Math.random() * 100);
    let RandomNumberMax = newRandomNumber;
    let RandomNumberMin = newRandomNumber;
    this.setState({ random: newRandomNumber });
    this.setState({ checkClose: false });
    this.startTiming();
    this.setState({
      checkCloseMax: this.state.checkCloseMax.map(
        arrayMax => arrayMax + 1 + RandomNumberMax++
      )
    });
    this.setState({
      checkCloseMin: this.state.checkCloseMin.map(
        arrayMin => arrayMin + RandomNumberMin--
      )
    });
  };

  gameCheck = number => {
    console.log(this.state.punshCoun);
    if (this.state.random === parseInt(number, 10)) {
      this.setState({ gameCheck: true });
      this.setState({ punshCount: parseInt(this.state.punshCount, 10) + 1 });
      this.newRandom();
    } else {
      this.setState({ gameCheck: false });
    }
  };

  checkClose = number => {
    let mynumber = parseInt(number, 10);
    // console.log(this.state.checkCloseMax.find(elem => (elem = 0)));
    if (
      this.state.checkCloseMax.find(elem => elem === mynumber) |
      this.state.checkCloseMin.find(elem => elem === mynumber)
    ) {
      this.setState({ checkClose: true });
    } else {
      this.setState({ checkClose: false });
    }
  };

  render() {
    // let resutl = (myint = x ? <h1>nice</h1> : <h1>Good</h1>);
    // console.log(`The random number:${x} , your gess is ${myint}`);
    // this.setState({ random: Math.floor(Math.random() * 2) });
    let message;
    this.state.punshCount === 3
      ? (message = (
          <h1 className=" text-info animated zoomInLeft">
            <p>You Won </p>
            <button
              className="padding_btn btn btn-info"
              onClick={this.startover}
            >
              Start Over
            </button>
          </h1>
        ))
      : (message = "");

    let hitmessage;
    this.state.gameCheck
      ? (hitmessage = (
          <h1 className="text-danger animated flip">Good hit!!!</h1>
        ))
      : (hitmessage = "");

    let animateName;
    this.state.gameCheck
      ? (animateName = "animated shake")
      : (animateName = "");

    let soClose;
    this.state.checkClose
      ? (soClose = <h3 className="text-warning">you are so close</h3>)
      : (soClose = "");

    let timerCountme;
    this.state.timer <= 0 && this.state.punshCount < 3
      ? (timerCountme = (
          <div className="text-danger">
            You Lost!!{" "}
            <button
              className="padding_btn btn btn-info"
              onClick={this.startover}
            >
              Start Over
            </button>
          </div>
        ))
      : (timerCountme = "");

    let timerCount;
    this.state.timer > 0
      ? (timerCount = <div className="timer">{this.state.timer}</div>)
      : (timerCount = "");

    return (
      <div className="App background">
        {!this.state.random ? (
          <div>
            <img src={img_1} alt="mounster" />
            <h1 className="text-warning">Punching Game</h1>
            <p className="disc_p">
              The monster is hiding between (0 - 100) try to punch him 3 times
              within 120 seconds to win the game.
            </p>
            <button
              className="padding_btn btn btn-info"
              onClick={() => this.newRandom()}
            >
              Start
            </button>
          </div>
        ) : (
          <div>
            {timerCount}
            <h1 className="text-info">Start Punching </h1>
            <img
              className=" "
              style={{ width: 100 }}
              src={img_2}
              alt="mounster"
            />
            <input
              value={this.state.inputValue}
              onChange={this.checkInputValue}
            />
            {soClose}
            <h1>
              <span className="text-danger">{this.state.punshCount}</span>{" "}
              <b className="text-warning">punches</b>
            </h1>
            <h1>{timerCountme}</h1>
            <h2>{message}</h2>
            <div className="col-3" />
            {hitmessage}
            <div className={animateName}>
              <img src={img_1} alt="mounster" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;

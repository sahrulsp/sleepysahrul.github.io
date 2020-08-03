import React, { Component } from "react";
import { TwitterPicker } from "react-color";
import reactCSS from "reactcss";
import baffle from "baffle";
//import Baffle from "baffle-react";

import "./style/App.css";
import "./style/Heart.css"
import config from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgcolor: "#ff6900",
      displayColorPicker: false,
      text: "",
      isDeleting: false,
      loopNum: 0,
      typingSpeed: 150,
      already: false,
    };
  }

  componentDidMount() {
    this.mengetik();
    this.setState({
      panggilan:
        config.panggilan[Math.floor(Math.random() * config.panggilan.length)],
    });
    this.getwaktu();
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChangeComplete = (color) => {
    this.setState({ bgcolor: color.hex });
    if (color.hex === "#000000") {
      if (!this.state.already) {
        this.baffle();
      }
    } else {
      this.setState({ already: false });
    }
  };

  baffle = () => {
    this.setState({ already: true });
    let b = baffle(document.querySelector(".baffle"));
    b.set({
      characters: "█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█ ░█▒/ ▒▓░ █<░▒ ▓/░>",
      speed: 120,
    });
    b.start();
    b.reveal(4000);
  };

  getwaktu = () => {
    setInterval(() => {
      var greeting;
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      if (hours >= 18) {
        greeting = "Evening";
      }else if (hours >= 15) {
        greeting = "Afternoon";
      }else if (hours >= 11) {
        greeting = "Day";
      }else if (hours >= 5) {
        greeting = "Morning";
      }else if (hours >= 0) {
        greeting = "Night";
      }
      this.setState({
        curdate: hours + ":" + min + ":" + sec,
        greeting: greeting,
      });
    }, 0);
  };

  mengetik = () => {
    const { ucapan } = config;
    const { isDeleting, loopNum, text, typingSpeed } = this.state;
    const i = loopNum % ucapan.length;
    const fullText = ucapan[i];

    this.setState({
      text: isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1),
      typingSpeed: isDeleting ? 30 : 150,
    });

    if (!isDeleting && text === fullText) {
      setTimeout(() => this.setState({ isDeleting: true }), 500);
    } else if (isDeleting && text === "") {
      this.setState({
        isDeleting: false,
        loopNum: loopNum + 1,
      });
    }
    setTimeout(this.mengetik, typingSpeed);
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",
          height: "14px",
          borderRadius: "2px",
          background: `${this.state.bgcolor}`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });

    return (
      <div
        className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"
        style={{
          //backgroundColor: localStorage.getItem("bgcolor"),
          backgroundColor: this.state.bgcolor,
          transition: "all .7s ease",
          WebkitTransition: "all .7s ease",
          MozTransition: "all .7s ease",
        }}
      >
        <header className="masthead mb-auto">
          <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <div className="navbar-brand">
              <div style={styles.swatch} onClick={this.handleClick}>
                <div style={styles.color} />
              </div>
              {this.state.displayColorPicker ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleClose} />
                  <TwitterPicker
                    //color={this.state.color}
                    onChange={this.handleChangeComplete}
                    triangle={"hide"}
                    colors={config.colors}
                  />
                </div>
              ) : null}
            </div>
          </nav>
        </header>

        <main role="main" className="inner">
          <div>
            <div
              className={this.state.bgcolor === "#000000" ? "hidden" : "show"}
            >
              <h1 className="jam">{this.state.curdate}</h1>
              <h2 className="panggilan">
                Good {this.state.greeting} {this.state.panggilan}
              </h2>
              <h3 className="ucapan">
                {this.state.text}
                <span id="cursor" />
              </h3>
              <ul class="heart-shape">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <div
              className={this.state.bgcolor !== "#000000" ? "hidden" : "show"}
            >
              <h1 className="baffle">
                Bro cari apa? Yaudahsih cuman ngetes aja akwoakwoakwkw
              </h1>
            </div>
          </div>
        </main>
        <footer className="mastfoot mt-auto">
          <div className="inner">
            <div></div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;

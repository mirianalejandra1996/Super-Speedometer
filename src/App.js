import React, { useState, useEffect } from "react";
import "./assets/styles.scss";
import odometer from "./assets/vectors/odometer.svg";
import needle from "./assets/vectors/needle.svg";

const App = () => {
  const [currentState, setCurrentState] = useState("green");
  const [message, setMessage] = useState("");
  const [degrees, setDegrees] = useState(0);
  const [output, setOutput] = useState(0);

  const handleChangeState = (state) => {
    if (state === "green") {
      return "yellow";
    } else if (state === "yellow") {
      return "red";
    } else {
      return "green";
    }
  };

  // * Create interval to change the color status
  useEffect(() => {
    const intervalChangeState = setInterval(() => {
      setCurrentState(handleChangeState);
    }, 2000);
    return () => clearInterval(intervalChangeState);
  }, []);

  // * Only accept numbers between 0-100 (No letters or symbols)
  const handleMessage = (e) => {
    const value = e.target.value.trim();

    // * If value contains spaces then clean it
    if (value.includes(" ")) {
      setMessage("");
      return;
    }

    // * If value contains letters can't write
    if (isNaN(Number(value))) {
      return;
    }

    // * If value has too much zeros at the beginning can't write ---> 0002 or 0.3
    if (value.length >= 7) {
      return;
    }

    // * If value is greater than 100 can't write
    if (Number(value) > 100) {
      return;
    }

    setMessage(value);
  };

  // * The output to show number entered and the handle clock (degree)
  const calculateDegrees = (e) => {
    e.preventDefault();

    if (!message || message.length === 0) {
      setOutput(0);
      setDegrees(0);
      return;
    }

    const degreesCalculator = (message * 360) / 100 / 2;
    const messageOutput = message >= 100 ? 100 : message;
    setOutput(messageOutput);

    // * If input entered is greater than 100, controls the excess of the needle up to 100
    if (message >= 100) {
      setDegrees(180);
      return;
    }
    setDegrees(degreesCalculator);
  };
  // ---------------
  return (
    <>
      <div className="message__container">
        <div className={"message__header " + currentState}></div>
        <form onSubmit={calculateDegrees} className="message__input-container">
          <input
            className="message__input"
            value={message}
            onChange={handleMessage}
            type="text"
            placeholder="Message to Update"
          />
        </form>
      </div>
      <div className="odometer__main-container">
        <div className="odometer__container">
          <div className="odometer__photo-container">
            <img src={odometer} className="odometer__img" alt="odometer" />
            <div
              className="needle__container"
              style={{
                transform: `translate(83%,-75%) rotate(${degrees}deg)`,
              }}
            >
              <img src={needle} className="needle__img" alt="needle" />
            </div>
          </div>
          <div className="output__container">
            <p className="output">{Number.parseFloat(output).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

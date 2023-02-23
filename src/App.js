import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [volume, setVolume] = useState(75);
  const [lastAction, setlastAction] = useState("Display");
  const [power, togglePower] = useState(true);
  return (
    <div className="App">
      <div id="drum-machine">
        <DrumPad setlastAction={setlastAction} volume={volume} power={power}/>
        <Controls
          lastAction={lastAction}
          setlastAction={setlastAction}
          volume={volume}
          setVolume={setVolume}
          power={power}
          togglePower={togglePower}
        />
      </div>
    </div>
  );
}

function DrumPad({ setlastAction, volume, power }) {
  function handleKeyDown(e) {
    if (power && ["q", "w", "e", "a", "s", "d", "z", "x", "c"].includes(e.key.toLowerCase())) {
      let audio = document.getElementById(
        e.key.toUpperCase()
      );
      setlastAction(audio.title);
      playAudio(audio);
    }
  }
  function handleClick(e) {
    let target = e.target;
    if (!power || target.className !== "drum-pad") return;
    let audio = target.firstElementChild;
    setlastAction(audio.title);
    playAudio(audio);
  }
  function playAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume / 100;
    audio.play();
  }
  return (
    <div
      id="drum-pad-wrapper"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div className="drum-pad" id="H1">
        Q
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
          title="Heater 1"
          className="clip"
          id="Q"
        ></audio>
      </div>
      <div className="drum-pad" id="H2">
        W
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
          title="Heater 2"
          className="clip"
          id="W"
        ></audio>
      </div>
      <div className="drum-pad" id="H3">
        E
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
          title="Heater 3"
          className="clip"
          id="E"
        ></audio>
      </div>
      <div className="drum-pad" id="H4">
        A
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
          title="Heater 4"
          className="clip"
          id="A"
        ></audio>
      </div>
      <div className="drum-pad" id="CLP">
        S
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
          title="Clap"
          className="clip"
          id="S"
        ></audio>
      </div>
      <div className="drum-pad" id="OHH">
        D
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
          title="Open HH"
          className="clip"
          id="D"
        ></audio>
      </div>
      <div className="drum-pad" id="KnH">
        Z
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
          title="Kick-n'-Hat"
          className="clip"
          id="Z"
        ></audio>
      </div>
      <div className="drum-pad" id="Kk">
        X
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
          title="Kick"
          className="clip"
          id="X"
        ></audio>
      </div>
      <div className="drum-pad" id="CHH">
        C
        <audio
          src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
          title="Closed-HH"
          className="clip"
          id="C"
        ></audio>
      </div>
    </div>
  );
}

function Controls(props) {
  let handleChange = (e) => {
    props.setVolume(e.target.value);
    props.setlastAction("Volume: " + e.target.value);
  };
  let handleMouseUp = () => document.getElementById("drum-pad-wrapper").focus();
  return (
    <div id="controls">
      <label className="switch">
        <input type="checkbox" defaultChecked={props.power} onClick={e=>props.togglePower(e.target.checked)}/>
        <span className="slider"></span>
      </label>
      <div id="display">{props.lastAction}</div>
      <input
        type="range"
        id="volume"
        min="0"
        max="100"
        value={props.volume}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
export default App;

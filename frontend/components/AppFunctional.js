import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function AppFunctional(props) {
  const dizi = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const kok = Math.sqrt(dizi.length);
  const [click, setClick] = useState(4);
  const [deger, setDeger] = useState(-1);
  const [email, setEmail] = useState("");
  let x = Math.floor(click / kok) + 1;
  let y = click < kok ? click + 1 : click + 1 - kok * (x - 1);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/api/result", { x, y, steps: deger, email })
      .then((err) => console.log(err))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setDeger(deger === -1 ? 0 : deger + 1);
  }, [click]);
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          {" "}
          Koordinatlar ({x},{y})
        </h3>
        <h3 id="steps">{deger} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {" "}
        {dizi.map((idx) => (
          <div key={idx} className={`square${idx === click ? " active" : ""}`}>
            {idx === click ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button
          onClick={() => {
            setClick(click - kok > -1 ? click - kok : click);
          }}
          id="up"
        >
          {" "}
          YUKARI{" "}
        </button>
        <button
          onClick={() => {
            setClick(click + 1 < dizi.length ? click + 1 : click);
          }}
          id="right"
        >
          SAĞ{" "}
        </button>
        <button
          onClick={() => {
            setClick(click - 1 > -1 ? click - 1 : click);
          }}
          id="left"
        >
          {" "}
          SOL
        </button>
        <button
          onClick={() => {
            setClick(click +  kok < dizi.length ? click + kok : click);
          }}
          id="down"
        >
          {" "}
          AŞAĞI{" "}
        </button>
        <button
          onClick={() => {
            setClick(4);
            setDeger(deger !== 0 ? -1 : 0);
          }}
          id="reset"
        >
          {" "}
          reset{" "}
        </button>{" "}
      </div>

      <form onSubmit={handleChange}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={handleEmail}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
